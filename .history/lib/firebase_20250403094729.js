import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeAQcHaFOlqVXluVgRUgipXpNn4yKf8j0",
  authDomain: "ndis-invoice-generator.firebaseapp.com",
  projectId: "ndis-invoice-generator",
  storageBucket: "ndis-invoice-generator.firebasestorage.app",
  messagingSenderId: "80394396896",
  appId: "1:80394396896:web:c9aad770dabcecfd705c85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase app, auth, and firestore
export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
