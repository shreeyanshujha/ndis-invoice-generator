import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">NDIS Invoice Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            name={key}
            placeholder={key.replace(/([A-Z])/g, ' $1')}
            value={value}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}
      </div>
      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
      >
        Generate Invoice PDF
      </button>
    </div>
  );
}
