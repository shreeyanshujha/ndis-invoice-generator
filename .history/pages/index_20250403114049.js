import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase'; // Firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        router.push('/home'); // Redirect to home if user is logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to the NDIS Invoice Generator</h1>
        <p>Effortlessly create and manage your invoices with our easy-to-use generator. Sign up or log in to get started.</p>
        <div className="cta-buttons">
          <Link href="/signup">
            <a className="cta-btn">Sign Up</a>
          </Link>
          <Link href="/login">
            <a className="cta-btn">Log In</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
