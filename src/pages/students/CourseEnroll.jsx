import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const CourseEnroll = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Courses"));
        const courseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">📚 Explore Our Courses</h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">{course.title}</h3>
              <p className="text-lg text-gray-600">👨‍🏫 {course.instructor}</p>
            </div>

            <p className="text-md text-gray-700 mb-4">{course.description}</p>

            <div className="flex flex-col gap-2 text-base text-gray-600 mb-4">
              <span><strong>📅 Duration:</strong> {course.duration}</span>
              <span><strong>📂 Category:</strong> {course.category}</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-blue-700">₹{course.price}</span>
              <button className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 text-md">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseEnroll;
