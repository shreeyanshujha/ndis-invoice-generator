import { AuthProvider } from '../lib/auth'; // Import your AuthProvider
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated (you can modify the check as needed)
    const user = localStorage.getItem('user');
    if (!user && router.pathname !== '/login') {
      router.push('/login');
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
