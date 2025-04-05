import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    duration: "",
    price: "",
    image: null,
    preview: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Courses"), {
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        category: formData.category,
        duration: formData.duration,
        price: formData.price,
        createdAt: new Date(),
      });

      alert("🎉 Course created successfully!");

      setFormData({
        title: "",
        description: "",
        instructor: "",
        category: "",
        duration: "",
        price: "",
        image: null,
        preview: null,
      });
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Error creating course");
    }
  };

  return (
    <div className="max-w-8xl mx-auto py-12 px-6 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">
        Create a New Course
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
        {/* Left Side: Course Form */}
        <div className="flex-1 space-y-6">
          {[
            { name: "title", placeholder: "Course Title", type: "text" },
            { name: "description", placeholder: "Course Description", type: "textarea" },
            { name: "instructor", placeholder: "Instructor Name", type: "text" },
            { name: "category", placeholder: "Category (e.g., Web Dev, AI)", type: "text" },
            { name: "duration", placeholder: "Duration (e.g., 6 weeks)", type: "text" },
            { name: "price", placeholder: "Price (INR)", type: "number" },
          ].map(({ name, placeholder, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
                {placeholder}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  id={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-blue-400"
                  rows={4}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  id={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required={name !== "instructor"}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-blue-400"
                />
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Image Upload */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            />
          </div>

          {formData.preview && (
            <div className="mt-4">
              <label className="block mb-1 font-medium text-gray-700">Image Preview:</label>
              <img
                src={formData.preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded shadow-md border"
              />
            </div>
          )}
        </div>
      </form>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition duration-200"
        >
          🚀 Submit Course
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
