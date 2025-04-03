import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);  // Store user data
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);  // Sign out the user
    router.push('/login');  // Redirect to login
  };

  const handleGenerateInvoice = () => {
    router.push('/invoice');  // Redirect to invoice page
  };

  return (
    <div className="container">
      {user ? (
        <div className="user-home">
          <h1>Welcome, {user.email}</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          <button className="generate-invoice-btn" onClick={handleGenerateInvoice}>Generate Invoice</button>
        </div>
      ) : (
        <div className="auth-container">
          <h2>Please log in to use the tool.</h2>
          <Link href="/login">
            <a>Log In</a>
          </Link>
          <br />
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </div>
      )}
    </div>
  );
}
