import { useContext, createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase'; // Import the app from firebase.js

const authContext = createContext();

// Custom hook to use authentication
export const useAuth = () => {
  return useContext(authContext);
};

// AuthProvider component to wrap your app and provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);  // Initialize auth from firebase

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user when authenticated
    });

    return () => unsubscribe(); // Clean up the listener
  }, [auth]);  // Add auth to the dependency array

  return <authContext.Provider value={{ user }}>{children}</authContext.Provider>;
};
