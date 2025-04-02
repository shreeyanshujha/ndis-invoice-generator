import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { useRouter } from 'next/router'; // To navigate programmatically
import { auth } from '../lib/firebase'; // Assuming firebase is initialized here
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState(null);  // To store user data
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
    <div style={styles.container}>
      {/* Check if user is logged in */}
      {user ? (
        <div style={styles.loggedInContainer}>
          <h1 style={styles.welcomeText}>Welcome, {user.displayName || 'User'}</h1>
          <button style={styles.button} onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div style={styles.loggedOutContainer}>
          <h1 style={styles.welcomeText}>Welcome to the NDIS Invoice Generator</h1>
          {/* Provide link to sign up */}
          <Link href="/signup">
            <a style={styles.link}>Sign Up</a>
          </Link>
          {/* Provide link to log in */}
          <Link href="/login">
            <a style={styles.link}>Log In</a>
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    fontFamily: "'Roboto', sans-serif",
  },
  loggedInContainer: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  loggedOutContainer: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  welcomeText: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#FF5733',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'inline-block',
    marginTop: '10px',
    fontWeight: '500',
  },
};

