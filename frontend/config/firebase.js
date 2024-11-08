import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0QRfP7cMddVwG3M2sa8wN0gJz_hWmJSw",
  authDomain: "users-7e27e.firebaseapp.com",
  projectId: "users-7e27e",
  storageBucket: "users-7e27e.appspot.com",
  messagingSenderId: "566118305335",
  appId: "1:566118305335:web:b65ea04794b25a607ff9b2",
  measurementId: "G-F7FTY1KW3L",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
