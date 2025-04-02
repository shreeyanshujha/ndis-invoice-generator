import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { useRouter } from 'next/router'; // To navigate programmatically
import { auth } from '../lib/firebase'; // Assuming firebase is initialized here
import { onAuthStateChanged } from 'firebase/auth';

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
    auth.signOut(); // Sign out the user when they log out
    router.push('/login'); // Redirect to login page
  };

  return (
    <div>
      {/* Check if user is logged in */}
      {user ? (
        <>
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <h1>Welcome to the NDIS Invoice Generator</h1>
          {/* Provide link to sign up */}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
          {/* Provide link to log in */}
          <Link href="/login">
            <a>Log In</a>
          </Link>
        </>
      )}
    </div>
  );
}
