const {initializaApp, getApps} = require('firebase/app')
const {getFirestore, Firestore} = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyA0QRfP7cMddVwG3M2sa8wN0gJz_hWmJSw",
  authDomain: "users-7e27e.firebaseapp.com",
  projectId: "users-7e27e",
  storageBucket: "users-7e27e.appspot.com",
  messagingSenderId: "566118305335",
  appId: "1:566118305335:web:b65ea04794b25a607ff9b2",
  measurementId: "G-F7FTY1KW3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = Firestore(app);