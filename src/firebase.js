// Import core functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIetu9ajHu1SzW7dGBP-3UlFaX6rL2z6I",
  authDomain: "elearning-4fd75.firebaseapp.com",
  projectId: "elearning-4fd75",
  storageBucket: "elearning-4fd75.appspot.com",
  messagingSenderId: "569212429219",
  appId: "1:569212429219:web:1883e4a05991e5a3bd3016"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { auth, db,onAuthStateChanged };