import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim() === '' || !email.includes('@')) return;
    localStorage.setItem('userEmail', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">NDIS Invoice Generator</h1>
        <p className="text-lg text-gray-600 mb-6">
          Generate professional NDIS-compliant invoices in under a minute. Free to use for your first 3 invoices. No account required.
        </p>

        {!submitted ? (
          <div className="mb-6 space-y-2">
            <input
              type="email"
              placeholder="Enter your email to get updates"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Save Email
            </button>
          </div>
        ) : (
          <p className="text-green-600 font-medium mb-6">✅ Email saved. You&apos;re good to go!</p>

        )}

        <Link href="/invoice">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Get Started Free
          </button>
        </Link>

        <p className="mt-4 text-sm text-gray-600 text-center">
           Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
             Sign up here
             </a>
        </p>


        <div className="mt-8 text-left text-sm text-gray-500">
          <p>✅ Fast, clean PDF invoices</p>
          <p>✅ Follows NDIS format requirements</p>
          <p>✅ Save time on admin — focus on your clients</p>
        </div>
      </div>
    </div>
  );
}
