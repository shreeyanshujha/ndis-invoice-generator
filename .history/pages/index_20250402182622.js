import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Instant NDIS Invoice Generator</h1>
      <p className="text-lg text-gray-700 text-center max-w-xl mb-6">
        Generate NDIS-compliant PDF invoices in seconds. No account needed. First 3 invoices are free.
      </p>
      <Link href="/invoice">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Get Started Free
        </button>
      </Link>
    </div>
  );
}
