import React from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  { id: 1, title: "Data Structures", image: "/dsa.jpg" },
  { id: 2, title: "Web Development", image: "/web.jpg" },
  { id: 3, title: "Operating Systems", image: "/os.png" },
  { id: 4, title: "DBMS", image: "/dbms.png" },
  { id: 5, title: "Computer Networks", image: "/cn.jpg" },
  { id: 6, title: "Software", image: "/software.jpeg" },
];

const CourseCreation = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/faculty/createcourse");
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 lg:px-16 xl:px-24 bg-gray-100 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Create Content
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
            Update Content
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {course.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCreation;
