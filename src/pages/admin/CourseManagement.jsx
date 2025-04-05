import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const initialCourses = [
  { id: 1, title: "Data Structures", image: "/dsa.jpg" },
  { id: 2, title: "Web Development", image: "/web.jpg" },
  { id: 3, title: "Operating Systems", image: "/os.png" },
  { id: 4, title: "DBMS", image: "/dbms.png" },
  { id: 5, title: "Computer Networks", image: "/cn.jpg" },
  { id: 6, title: "Software", image: "/software.jpeg" },
];

const CourseManagement = () => {
  const [courses, setCourses] = useState(initialCourses);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="w-full py-10 px-6 md:px-10 lg:px-16 xl:px-24 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">🛠️ Admin Course Management</h1>

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative"
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
              <button
                onClick={() => handleDelete(course.id)}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                title="Delete Course"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-20">No courses available.</p>
      )}
    </div>
  );
};

export default CourseManagement;
