import { Link } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Video, 
  ClipboardList, 
  Pencil, 
  GraduationCap 
} from "lucide-react";

const StudentSidebar = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-16 text-white"></h2>
    <ul>
      <li className="mb-8">
        <Link to="/dashboard" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <Home className="w-6 h-6" />
          <span className="text-justify">Dashboard</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/courseenroll" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <BookOpen className="w-6 h-6" />
          <span className="text-justify">Course Enrolment</span>
        </Link>
      </li>

      <li className="mb-8">
        <Link to="/student/courseRecommender" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <BookOpen className="w-6 h-6" />
          <span className="text-justify">Ai Course</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/lectures" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <Video className="w-6 h-6" />
          <span className="text-justify">Lecture Access</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/assignments" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <ClipboardList className="w-6 h-6" />
          <span className="text-justify">Assignments</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/quizzes" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <Pencil className="w-6 h-6" />
          <span className="text-justify">Quizzes & Exams</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/grades" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <GraduationCap className="w-6 h-6" />
          <span className="text-justify">Grades & Feedback</span>
        </Link>
      </li>
      <li className="mb-8">
        <Link to="/student/announcementlist" className="flex items-center space-x-3 text-white text-2xl hover:text-blue-900">
          <GraduationCap className="w-6 h-6" />
          <span className="text-justify">Announcements</span>
        </Link>
      </li>
    </ul>
  </div>
);

export default StudentSidebar;
