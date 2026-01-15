
# Wanky Academy Payment System Deployment

## 1. Prerequisites
- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Stripe Account (Secret Key & Publishable Key)
- PayPal Business Account

## 2. Firebase Setup
1. Login: `firebase login`
2. Initialize: `firebase init`
   - Select **Functions**, **Firestore**, **Hosting**.
   - Use project: `wankyacademy-payments`
   - Javascript for functions.
   - Do not overwrite `functions/index.js` or `functions/package.json` if prompted (we just created them).

## 3. Configuration
Set environment variables for Cloud Functions:

```bash
firebase functions:config:set stripe.secret_key="sk_live_..." stripe.webhook_secret="whsec_..."
```

## 4. Deploy Backend
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 5. Deploy Frontend
Build the React app and deploy hosting:

```bash
npm run build
firebase deploy --only hosting
```

## 6. Webhook Setup
- **Stripe Dashboard**: Add endpoint `https://us-central1-wankyacademy-payments.cloudfunctions.net/stripeWebhook`. Listen for `checkout.session.completed`.
- **PayPal Developer**: Add webhook `https://us-central1-wankyacademy-payments.cloudfunctions.net/paypalWebhook`. Listen for `CHECKOUT.ORDER.APPROVED`.

## 7. Admin Access
- Create a Firebase Auth user with email `admin@wankyacademy.com`.
- Login at `https://wankyacademy.com/#/admin`.
