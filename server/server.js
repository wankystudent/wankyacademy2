
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Stripe with Secret Key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map internal course IDs to Stripe Price IDs
// You must create these products in your Stripe Dashboard and replace the IDs here
const COURSE_PRICES = {
  "canva-mastery": "price_1Pxxxxxx", // Replace with real Price ID
  "wordpress-course": "price_1Pyyyyyy", // Replace with real Price ID
  "web-master": "price_1Pzzzzzz" // Replace with real Price ID
};

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // Default to a fallback if course ID not found in map (for testing)
    // In production, you might want to return an error or handle dynamic prices
    const priceId = COURSE_PRICES[courseId] || COURSE_PRICES['canva-mastery']; 

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // If using Price IDs from Stripe Dashboard
          // OR use dynamic data for testing if you haven't set up Products yet:
          // price_data: {
          //   currency: 'usd',
          //   product_data: { name: 'Wanky Academy Course' },
          //   unit_amount: 4999, // $49.99
          // },
          quantity: 1,
        },
      ],
      // Redirect URLs
      success_url: `${req.headers.origin}/#/payment-success?course=${courseId}`,
      cancel_url: `${req.headers.origin}/#/subscribe`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Stripe server running on port ${PORT}`));
