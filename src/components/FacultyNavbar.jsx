import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, UserCircle } from "lucide-react";

const FacultyNavbar = ({ onNotificationsClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens or session if needed
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="text-xl font-semibold">Faculty Dashboard</div>

      <div className="flex items-center space-x-4 gap-5 relative">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              onNotificationsClick && onNotificationsClick();
            }}
            className="hover:text-gray-300"
          >
            <Bell size={28} />
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x- hover:text-gray-300"
          >
            <UserCircle size={24} />
            <ChevronDown size={16} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
              <ul className="py-2 text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/student/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/student/settings")}
                >
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyNavbar;
