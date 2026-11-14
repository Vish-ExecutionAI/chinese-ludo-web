import React, { useState } from 'react';

export function ClientForm({ addClient }) {
  const [clientName, setClientName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientName.trim()) {
      addClient({ name: clientName });
      setClientName('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientName">Client Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
            required
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}
