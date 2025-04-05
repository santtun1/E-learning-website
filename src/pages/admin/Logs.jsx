import React from "react";
import { useNavigate } from "react-router-dom";

const Logs = () => {
  const navigate = useNavigate();

  // Dummy logs — you can replace with API data
  const logs = [
    {
      id: 1,
      user: "Admin",
      action: "Added new course: 'Advanced React'",
      timestamp: "2025-04-04 09:45 AM",
    },
    {
      id: 2,
      user: "Student123",
      action: "Logged in",
      timestamp: "2025-04-04 09:15 AM",
    },
    {
      id: 3,
      user: "Faculty456",
      action: "Updated course content for 'Physics 101'",
      timestamp: "2025-04-03 03:27 PM",
    },
    {
      id: 4,
      user: "Admin",
      action: "Removed user Student789",
      timestamp: "2025-04-02 11:18 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">📋 Admin Activity Logs</h1>
      
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-600 font-semibold border-b">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{log.id}</td>
                <td className="py-3 px-4">{log.user}</td>
                <td className="py-3 px-4">{log.action}</td>
                <td className="py-3 px-4 text-gray-500">{log.timestamp}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No logs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
