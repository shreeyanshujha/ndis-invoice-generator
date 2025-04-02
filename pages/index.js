import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">NDIS Invoice Generator</h1>
        <p className="text-lg text-gray-600 mb-6">
          Generate professional NDIS-compliant invoices in under a minute. Free to use for your first 3 invoices. No account required.
        </p>
        <Link href="/invoice">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Get Started Free
          </button>
        </Link>
        <div className="mt-8 text-left text-sm text-gray-500">
          <p>✅ Fast, clean PDF invoices</p>
          <p>✅ Follows NDIS format requirements</p>
          <p>✅ Save time on admin — focus on your clients</p>
        </div>
      </div>
    </div>
  );
}
