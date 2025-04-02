import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setIsPaid(snap.data().isPaid || false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isPaid, logOut: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
