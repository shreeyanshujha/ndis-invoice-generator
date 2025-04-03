import { useState } from 'react';

export default function InvoiceGenerator() {
  const [formData, setFormData] = useState({
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
    accountNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., generate PDF)
  };

  return (
    <div className="container">
      <h1>NDIS Invoice Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="providerName"
          placeholder="Provider Name"
          value={formData.providerName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="abn"
          placeholder="ABN"
          value={formData.abn}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="participantName"
          placeholder="Participant Name"
          value={formData.participantName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="ndisNumber"
          placeholder="NDIS Number"
          value={formData.ndisNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="serviceDate"
          value={formData.serviceDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="supportItem"
          placeholder="Support Item"
          value={formData.supportItem}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="hours"
          placeholder="Hours"
          value={formData.hours}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={formData.rate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="bsb"
          placeholder="BSB"
          value={formData.bsb}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleInputChange}
          required
        />
        <button className="generate-invoice-btn" type="submit">Generate Invoice PDF</button>
      </form>
    </div>
  );
}
