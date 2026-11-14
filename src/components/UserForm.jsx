import React, { useState } from 'react';

export function UserForm({ addUser }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() && userEmail.trim()) {
      addUser({ name: userName, email: userEmail });
      setUserName('');
      setUserEmail('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name"
            required
          />
        </div>
        <div>
          <label htmlFor="userEmail">User Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter user email"
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
