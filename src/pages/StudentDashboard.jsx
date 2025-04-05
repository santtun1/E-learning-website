import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  PlaySquare,
  FileText,
  Lightbulb,
  ClipboardCheck,
  Megaphone,
} from "lucide-react";

const cardData = [
  {
    title: "Course Enrolment",
    value: "5 Courses",
    path: "/student/courseenroll",
    icon: <GraduationCap className="w-8 h-8 text-indigo-600 mb-2" />,
  },
  {
    title: "Lecture Access",
    value: "12 Videos",
    path: "/student/lectures",
    icon: <PlaySquare className="w-8 h-8 text-indigo-600 mb-2" />,
  },
  {
    title: "Assignments",
    value: "3 Pending",
    path: "/student/assignments",
    icon: <FileText className="w-8 h-8 text-indigo-600 mb-2" />,
  },
  {
    title: "Course Recommendation",
    value: "2 Upcoming",
    path: "/student/courseRecommender",
    icon: <Lightbulb className="w-8 h-8 text-indigo-600 mb-2" />,
  },
  {
    title: "Grades & Feedback",
    value: "A- Average",
    path: "/student/grades",
    icon: <ClipboardCheck className="w-8 h-8 text-indigo-600 mb-2" />,
  },
  {
    title: "Announcements",
    value: "From Admin",
    path: "/student/announcementlist",
    icon: <Megaphone className="w-8 h-8 text-indigo-600 mb-2" />,
  },
];

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-700 mb-10 text-center">🎓 Student Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
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

export default StudentDashboard;
