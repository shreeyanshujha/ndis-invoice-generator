import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeAQcHaFOlqVXluVgRUgipXpNn4yKf8j0",  // Direct API key
  authDomain: "ndis-invoice-generator.firebaseapp.com",  // Direct Auth domain
  projectId: "ndis-invoice-generator",  // Direct Project ID
  storageBucket: "ndis-invoice-generator.appspot.com",  // Corrected Firebase Storage URL
  messagingSenderId: "80394396896",  // Direct Sender ID
  appId: "1:80394396896:web:c9aad770dabcecfd705c85",  // Direct App ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Authentication

export { auth };
