import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    router.push('/login');
  };

  const handleGenerateInvoice = () => {
    router.push('/invoice'); // Redirect to invoice generator page
  };

  return (
    <div className="container">
      {user ? (
        <div className="welcome-container">
          <h1>Welcome, {user.email}</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          <button className="generate-invoice-btn" onClick={handleGenerateInvoice}>Generate Invoice</button>
        </div>
      ) : (
        <div className="auth-container">
          <div className="auth-form">
            <h2>Log In</h2>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}
