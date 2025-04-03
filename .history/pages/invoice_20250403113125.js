import dynamic from 'next/dynamic';

const InvoiceComponent = dynamic(() => import('../components/InvoiceComponent'), {
  ssr: false, // ⛔ disables server-side rendering to avoid useAuth crash
});

export default function InvoicePage() {
  return <InvoiceComponent />;
}
