import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebase'; // Import the initialized Firebase app

const auth = getAuth(app); // Get the Firebase auth instance

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object upon successful sign-up
  } catch (error) {
    console.error('Error signing up: ', error);
    throw error; // Throw the error so it can be handled in the component
  }
};

// Log in function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object upon successful login
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error; // Throw the error so it can be handled in the component
  }
};

// Log out function
export const logOut = async () => {
  try {
    await signOut(auth); // Sign out the user
  } catch (error) {
    console.error('Error signing out: ', error);
    throw error; // Throw the error so it can be handled if necessary
  }
};

// Optionally, you can add more Firebase functionalities like resetting passwords, etc.
