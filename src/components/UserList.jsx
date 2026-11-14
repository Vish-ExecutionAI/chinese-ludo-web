import React from 'react';

export function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p>No users found. Add a new user using the form below.</p>;
  }
  return (
    <div className="card-list">
      {users.map((user) => (
        <div key={user.id} className="card">
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
          <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
