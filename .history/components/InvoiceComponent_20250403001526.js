import { useEffect } from 'react';
import { useRouter } from 'next/router';

const InvoiceComponent = () => {
  const router = useRouter(); // Get router from next/router

  useEffect(() => {
    // Your logic here, for example:
    if (router.query.someParam) {
      // Do something with the param
    }
  }, [router]); // Add `router` as a dependency to avoid the warning

  return (
    <div>
      {/* Invoice component content here */}
    </div>
  );
};

export default InvoiceComponent;
