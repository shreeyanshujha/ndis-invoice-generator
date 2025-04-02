import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';  // Ensure you import the auth functions

const InvoiceComponent = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Prevents redirect before loading completes
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, loading, router]); // Added dependencies

  return (
    <div>
      {/* Invoice component content */}
      <h1>Invoice Component</h1>
    </div>
  );
};

export default InvoiceComponent;
