import { useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from 'next/router';

export default function Success() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const updatePaidStatus = async () => {
      if (user) {
        const ref = doc(db, 'users', user.uid);
        await updateDoc(ref, { isPaid: true });
        alert('Thanks for subscribing! ✅ Unlimited invoices unlocked.');
        router.push('/invoice');
      }
    };
    updatePaidStatus();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">
      Finalizing your subscription...
    </div>
  );
}
