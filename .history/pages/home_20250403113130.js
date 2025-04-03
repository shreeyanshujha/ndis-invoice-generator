import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; // Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push('/'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <div className="user-home">
      <div className="user-info">
        <h1>Welcome, {user ? user.email : 'User'}</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}
