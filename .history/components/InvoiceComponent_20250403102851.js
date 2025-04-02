import { useState } from 'react';
import { useAuth } from '../lib/auth'; // Import useAuth to access user data
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function InvoiceComponent() {
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

  const { user } = useAuth(); // Use the user from the auth context to display user-specific content

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
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
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">NDIS Invoice Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
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
