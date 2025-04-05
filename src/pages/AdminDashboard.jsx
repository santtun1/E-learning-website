import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Megaphone,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";

const adminCardData = [
  {
    title: "User Management",
    value: "120 Users",
    path: "/admin/user-management",
    icon: <Users className="w-8 h-8 text-indigo-600 mb-3" />,
  },
  {
    title: "Report Generation",
    value: "15 Reports",
    path: "/admin/report-generation",
    icon: <BarChart3 className="w-8 h-8 text-indigo-600 mb-3" />,
  },
  {
    title: "Announcements",
    value: "3 Active",
    path: "/admin/announcements",
    icon: <Megaphone className="w-8 h-8 text-indigo-600 mb-3" />,
  },
  {
    title: "Course Management",
    value: "10 Courses",
    path: "/admin/coursemanagement",
    icon: <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />,
  },
  {
    title: "System Settings",
    value: "Updated",
    path: "/admin/systemsettings",
    icon: <Settings className="w-8 h-8 text-indigo-600 mb-3" />,
  },
  {
    title: "Logs",
    value: "21 Files",
    path: "/admin/logs",
    icon: <FileText className="w-8 h-8 text-indigo-600 mb-3" />,
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center">🛠️ Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adminCardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center h-52 w-full cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => navigate(card.path)}
          >
            {card.icon}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{card.title}</h2>
            <p className="text-indigo-600 text-lg font-medium">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
