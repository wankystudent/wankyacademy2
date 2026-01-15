
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe?.secret_key || "sk_test_PLACEHOLDER"); // Set via config

admin.initializeApp();
const db = admin.firestore();

exports.createOrder = functions.https.onRequest(async (req, res) => {
  // CORS support
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const orderData = req.body;
    
    // Validate essential fields
    if (!orderData.orderId || !orderData.toolName) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    // Default status pending
    orderData.paymentStatus = orderData.paymentStatus || "pending";
    orderData.serverTimestamp = admin.firestore.FieldValue.serverTimestamp();

    await db.collection("orders").doc(orderData.orderId).set(orderData);
    
    res.json({ success: true, orderId: orderData.orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = functions.config().stripe?.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    
    // Find order by Stripe Session ID (if saved during creation)
    // Or update order based on metadata if you pass orderId in metadata
    // Here assuming we query by stripeSessionId if it exists, or just log it.
    
    try {
        const snapshot = await db.collection("orders")
            .where("stripeSessionId", "==", session.id)
            .limit(1)
            .get();
        
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            await doc.ref.update({ paymentStatus: "paid" });
            console.log(`Order ${doc.id} marked as paid.`);
        } else {
            console.log("No matching order found for session:", session.id);
            // Optionally create a new order record here if frontend failed to create it
        }
    } catch (e) {
        console.error("Error updating order:", e);
    }
  }

  res.json({ received: true });
});

exports.paypalWebhook = functions.https.onRequest(async (req, res) => {
    // Basic PayPal Webhook Handler
    // Verify signature logic omitted for brevity, in production use paypal-rest-sdk verification
    const event = req.body;
    
    if (event.event_type === "CHECKOUT.ORDER.APPROVED" || event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        const resource = event.resource;
        // Logic to match order, e.g. by custom_id or invoice_id
        console.log("PayPal Payment Event:", event.event_type, resource.id);
        
        // Example: Update order if you stored PayPal Transaction ID
        // const snapshot = await db.collection("orders").where("paypalTransactionId", "==", resource.id).get();
        // ... update logic
    }

    res.status(200).send("OK");
});
