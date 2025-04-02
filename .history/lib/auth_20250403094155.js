import { useContext, createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase'; // Make sure app is exported here

const authContext = createContext();

// Custom hook to use authentication
export const useAuth = () => {
  return useContext(authContext);
};

// AuthProvider component to wrap your app and provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUser(user); // Set user when authenticated
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return <authContext.Provider value={{ user }}>{children}</authContext.Provider>;
};

export const app = initializeApp(firebaseConfig); // Ensure firebase is initialized and exported
