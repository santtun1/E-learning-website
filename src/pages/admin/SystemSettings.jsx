import React, { useState } from "react";

const SystemSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [defaultUserRole, setDefaultUserRole] = useState("student");
  const [dataBackupFrequency, setDataBackupFrequency] = useState("daily");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleSave = () => {
    const settings = {
      maintenanceMode,
      notificationsEnabled,
      defaultUserRole,
      dataBackupFrequency,
      sessionTimeout,
      autoUpdate,
    };
    console.log("Saved Settings:", settings);
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-2xl  p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          ⚙️ System Settings
        </h1>

        {/* General Settings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">🔧 General Settings</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex justify-between items-center">
              <label className="text-gray-700 font-medium">Maintenance Mode</label>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="text-gray-700 font-medium">Enable Notifications</label>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Default User Role
              </label>
              <select
                value={defaultUserRole}
                onChange={(e) => setDefaultUserRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Session Timeout (in mins)
              </label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="5"
              />
            </div>
          </div>
        </section>

        {/* Backup and Updates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">💾 Backup & Updates</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Data Backup Frequency
              </label>
              <select
                value={dataBackupFrequency}
                onChange={(e) => setDataBackupFrequency(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-gray-700 font-medium">Enable Auto Updates</label>
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={() => setAutoUpdate(!autoUpdate)}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3 rounded-xl transition duration-300 shadow-lg"
          >
            💾 Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
