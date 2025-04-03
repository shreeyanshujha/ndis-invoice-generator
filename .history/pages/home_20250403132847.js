import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

const homeStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  userHome: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#f44d4d',
    color: 'white',
  },
  generateButton: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  }
};

export default function Home() {
  const [user, setUser] = useState(null);  // Store user data
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [router]);  // Add router as dependency

  const handleLogout = () => {
    signOut(auth);  // Sign out the user
    router.push('/login');  // Redirect to login
  };

  const handleGenerateInvoice = () => {
    router.push('/invoice');  // Redirect to invoice page
  };

  return (
    <div style={homeStyles.container}>
      {user ? (
        <div style={homeStyles.userHome}>
          <h1>Welcome, {user.email}</h1>
          <button
            style={{ ...homeStyles.button, ...homeStyles.logoutButton }}
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            style={{ ...homeStyles.button, ...homeStyles.generateButton }}
            onClick={handleGenerateInvoice}
          >
            Generate Invoice
          </button>
        </div>
      ) : (
        <div style={homeStyles.userHome}>
          <h2>Please log in to use the tool.</h2>
          <Link href="/login">
            <a style={homeStyles.link}>Log In</a>
          </Link>
          <br />
          <Link href="/signup">
            <a style={homeStyles.link}>Sign Up</a>
          </Link>
        </div>
      )}
    </div>
  );
}
