import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth); // Sign out the user
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="user-home">
      {/* Check if user is logged in */}
      {user ? (
        <div className="user-info">
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
          {/* Invoice Generator Button */}
          <Link href="/invoice">
            <button className="generate-invoice-btn">Generate Invoice</button>
          </Link>
        </div>
      ) : (
        <div className="landing-content">
          <h1>Welcome to the NDIS Invoice Generator</h1>
          <p>Please log in to use the tool.</p>
          <div className="cta-buttons">
            <Link href="/signup">
              <a className="cta-btn">Sign Up</a>
            </Link>
            <Link href="/login">
              <a className="cta-btn">Log In</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
