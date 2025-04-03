import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Make sure this points to your firebase.js file
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

// Custom hook to access the auth state
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider to wrap your app and pass down auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
