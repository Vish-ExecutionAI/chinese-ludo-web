import { useState } from "react";
import { Dashboard } from "./components/Dashboard.jsx";
import { ClientList } from "./components/ClientList.jsx";
import { ClientForm } from "./components/ClientForm.jsx";
import { UserList } from "./components/UserList.jsx";
import { UserForm } from "./components/UserForm.jsx";
import "./styles.css";

export default function App() {
  const [section, setSection] = useState("Dashboard");
  const [clients, setClients] = useState([
    { id: "c1", name: "Client A", createdAt: new Date().toISOString() },
    { id: "c2", name: "Client B", createdAt: new Date().toISOString() }
  ]);
  const [users, setUsers] = useState([
    { id: "u1", name: "Alice", email: "alice@example.com", createdAt: new Date().toISOString() },
    { id: "u2", name: "Bob", email: "bob@example.com", createdAt: new Date().toISOString() }
  ]);

  const addClient = (newClient) => {
    setClients((prevClients) => [
      ...prevClients,
      { id: `c${Date.now()}`, createdAt: new Date().toISOString(), ...newClient }
    ]);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: `u${Date.now()}`, createdAt: new Date().toISOString(), ...newUser }
    ]);
  };

  return (
    <div className="shell">
      <aside>
        <h1>Chinese Ludo</h1>
        <button onClick={() => setSection("Dashboard")} className={section === "Dashboard" ? "active" : ""}>
          Dashboard
        </button>
        <button onClick={() => setSection("Clients")} className={section === "Clients" ? "active" : ""}>
          Clients
        </button>
        <button onClick={() => setSection("Users")} className={section === "Users" ? "active" : ""}>
          Users
        </button>
      </aside>
      <main>
        <span>Generated application</span>
        <h2>{section}</h2>

        {section === "Dashboard" && <Dashboard />}

        {section === "Clients" && (
          <div className="content-section">
            <h3>Current Clients</h3>
            <ClientList clients={clients} />
            <h3>Add New Client</h3>
            <ClientForm addClient={addClient} />
          </div>
        )}

        {section === "Users" && (
          <div className="content-section">
            <h3>Current Users</h3>
            <UserList users={users} />
            <h3>Add New User</h3>
            <UserForm addUser={addUser} />
          </div>
        )}
      </main>
    </div>
  );
}