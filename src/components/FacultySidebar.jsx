import { Link } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  Pencil,
  Users,
  LayoutDashboard,
} from "lucide-react";

const FacultySidebar = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-24 text-white"></h2>
    <ul>
      <li className="mb-8">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900"
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-justify">Dashboard</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link
          to="/faculty/course-creation"
          className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-justify">Course Management</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link
          to="/faculty/assignment-management"
          className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900"
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-justify">Assignment Management</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link
          to="/faculty/quizCreator"
          className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900"
        >
          <Pencil className="w-6 h-6" />
          <span className="text-justify">Quiz Management</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link
          to="/faculty/student-tracking"
          className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900"
        >
          <Users className="w-6 h-6" />
          <span className="text-justify">Student Tracking</span>
        </Link>
      </li>
    </ul>
  </div>
);

export default FacultySidebar;
