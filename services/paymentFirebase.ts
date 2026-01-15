
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCswwo2vH1qF0YNsGsXb4dMS9IqGmOH6F0",
  authDomain: "wankyacademy-payments.firebaseapp.com",
  projectId: "wankyacademy-payments",
  storageBucket: "wankyacademy-payments.firebasestorage.app",
  messagingSenderId: "356922905860",
  appId: "1:356922905860:web:704041ab58fb2936a2ec51",
  measurementId: "G-XSE1JC6WJE"
};

// Initialize with a specific name to avoid conflicts with the default app (certificates)
const app = initializeApp(firebaseConfig, "paymentsApp");

export const db = getFirestore(app);
export const auth = getAuth(app);
