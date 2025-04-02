import React from 'react';
import Link from 'next/link';  // Import Link from Next.js

const SuccessComponent = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-4">Thank You for Subscribing!</h2>
        <p className="text-center text-lg text-gray-600 mb-6">
          Your subscription to the NDIS Invoice Generator is now active.
          <br />
          You'll start receiving invoices soon. We appreciate your support!
        </p>
        <div className="text-center">
          <Link href="/" passHref>  {/* Use Link component from next/link */}
            <button className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition duration-300">
              Go Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessComponent;
