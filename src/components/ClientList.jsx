import React from 'react';

export function ClientList({ clients }) {
  if (!clients || clients.length === 0) {
    return <p>No clients found. Add a new client using the form below.</p>;
  }
  return (
    <div className="card-list">
      {clients.map((client) => (
        <div key={client.id} className="card">
          <h4>{client.name}</h4>
          <p>ID: {client.id}</p>
          <p>Created: {new Date(client.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
