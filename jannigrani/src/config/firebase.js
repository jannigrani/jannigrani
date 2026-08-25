import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC_L-JJHXwTIj3b0vewyVB6e42DIGLxEao",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "janni-2299a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "janni-2299a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "janni-2299a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "17330157119",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:17330157119:web:bc3326ac010fa051072a8a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);