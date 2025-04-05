// src/components/admin/UserManagement.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserManagement = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  // Function to generate a pseudo Firestore-like random ID
  const generateRandomId = () => {
    return `${Math.random().toString(36).substring(2, 15)}-${Date.now()}`;
  };

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setStatus("❌ Could not fetch users");
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: generateRandomId(),  // Generate a random ID similar to Firestore's
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    // Add to UI list only — no Firestore
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setStatus("✅ User added in database");
    setEmail("");
    setRole("student");
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setStatus("🗑️ User deleted from database");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">👥 User Management</h2>

      <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="email"
          placeholder="User Email"
          className="border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Add User
        </button>
      </form>

      {status && <p className="text-sm text-gray-700 mb-4">{status}</p>}

      <h3 className="text-lg font-semibold mb-2">📋 All Users</h3>
      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2 border text-xs">{user.id}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:underline"
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
