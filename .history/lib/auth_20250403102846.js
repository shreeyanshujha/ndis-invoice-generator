import { getAuth } from 'firebase/auth';
import { app } from './firebase'; // Use app from firebase.js

// Initialize the auth object with the imported app
const auth = getAuth(app);

// Export the auth object if needed in other parts of your application
export { auth };
