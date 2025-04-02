// lib/firebase.js
import { initializeApp } from 'firebase/app';  // Initialize Firebase app
import { getAuth } from 'firebase/auth';  // Get Firebase authentication
import { getFirestore } from 'firebase/firestore';  // Get Firestore (optional if you're not using Firestore)

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeAQcHaFOlqVXluVgRUgipXpNn4yKf8j0", // Your API Key (make sure to keep this secure)
  authDomain: "ndis-invoice-generator.firebaseapp.com", // Auth Domain
  projectId: "ndis-invoice-generator", // Firebase Project ID
  storageBucket: "ndis-invoice-generator.firebasestorage.app", // Storage Bucket
  messagingSenderId: "80394396896", // Sender ID
  appId: "1:80394396896:web:c9aad770dabcecfd705c85" // App ID
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);

// Export authentication and Firestore services to be used across your app
export const auth = getAuth(app); // Firebase authentication
export const db = getFirestore(app); // Firestore (optional)

