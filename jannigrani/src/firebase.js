import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA0LhdDnfbwiZvgRJq5XTV5IfgcQ-9-wOw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "movyra-customer-prod.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "movyra-customer-prod",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "movyra-customer-prod.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1087124236242",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1087124236242:web:5e54116366ed38b9fd4a0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);