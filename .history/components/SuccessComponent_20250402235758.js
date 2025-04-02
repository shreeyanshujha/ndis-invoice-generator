import React from 'react';

const SuccessComponent = () => {
  return (
    <div className="success-container">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Thank you for subscribing!</h2>
      <p className="text-center text-lg text-gray-700">
        Your subscription to the NDIS Invoice Generator is now active.
        You'll start receiving invoices soon. We appreciate your support!
      </p>
      <div className="mt-6 text-center">
        <a href="/" className="text-blue-600 hover:text-blue-800">Go back to homepage</a>
      </div>
    </div>
  );
};

export default SuccessComponent;
