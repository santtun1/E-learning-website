import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Megaphone,
  BookOpen,
} from "lucide-react";

const AdminSidebar = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-24 text-white"></h2>
    <ul>
      <li className="mb-8">
        <Link to="/dashboard" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-justify">Dashboard</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/admin/user-management" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <Users className="w-6 h-6" />
          <span className="text-justify">User Management</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/admin/report-generation" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <FileText className="w-6 h-6" />
          <span className="text-justify">Report Generation</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/admin/announcements" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <Megaphone className="w-6 h-6" />
          <span className="text-justify">Announcements</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/admin/coursemanagement" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <BookOpen className="w-6 h-6" />
          <span className="text-justify">Course Management</span>
        </Link>
      </li>
    </ul>
  </div>
);

export default AdminSidebar;