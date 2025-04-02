import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../lib/auth'; // Assuming you created this hook
import { useRouter } from 'next/router';

export default function Invoice() {
  const [form, setForm] = useState({
    providerName: '',
    abn: '',
    participantName: '',
    ndisNumber: '',
    serviceDate: '',
    supportItem: '',
    description: '',
    hours: '',
    rate: '',
    bsb: '',
    accountNumber: '',
  });

  const [invoiceCount, setInvoiceCount] = useState(0);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // redirect to login if not authenticated
    }
  }, [user, loading, router]);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('invoiceCount') || '0');
    setInvoiceCount(count);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    if (invoiceCount >= 3) {
      alert('Free invoice limit reached. Please subscribe to continue.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('NDIS Invoice', 14, 20);

    doc.setFontSize(12);
    doc.text(`Provider: ${form.providerName}`, 14, 30);
    doc.text(`ABN: ${form.abn}`, 14, 36);
    doc.text(`Participant: ${form.participantName}`, 14, 42);
    doc.text(`NDIS #: ${form.ndisNumber}`, 14, 48);

    autoTable(doc, {
      startY: 60,
      head: [['Date', 'Item Code', 'Description', 'Hours', 'Rate', 'Amount']],
      body: [
        [
          form.serviceDate,
          form.supportItem,
          form.description,
          form.hours,
          `$${form.rate}`,
          `$${(parseFloat(form.hours) * parseFloat(form.rate)).toFixed(2)}`,
        ],
      ],
    });

    const total = (parseFloat(form.hours) * parseFloat(form.rate)).toFixed(2);
    doc.text(`Total: $${total}`, 14, doc.lastAutoTable.finalY + 10);

    doc.text(`BSB: ${form.bsb}`, 14, doc.lastAutoTable.finalY + 20);
    doc.text(`Account #: ${form.accountNumber}`, 14, doc.lastAutoTable.finalY + 26);

    doc.save(`Invoice-${form.participantName}.pdf`);
    const newCount = invoiceCount + 1;
    localStorage.setItem('invoiceCount', newCount);
    setInvoiceCount(newCount);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-1 text-center text-gray-800">
          NDIS Invoice Generator
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Logged in as <span className="font-medium">{user.email}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                name={key}
                placeholder={key.replace(/([A-Z])/g, ' $1')}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={generatePDF}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Generate Invoice PDF
          </button>
        </div>
      </div>
    </div>
  );
}
