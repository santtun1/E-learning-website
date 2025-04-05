import React, { useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.deadline || !form.file) {
      alert("Please fill all required fields");
      return;
    }

    const newAssignment = {
      id: Date.now(), // use timestamp as ID
      title: form.title,
      description: form.description,
      deadline: form.deadline,
      fileName: form.file.name,
      uploadedAt: new Date().toLocaleString(),
    };

    setAssignments([newAssignment, ...assignments]);
    setForm({ title: "", description: "", deadline: "", file: null });
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📤 Upload Assignment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1"
            placeholder="Assignment title"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1"
            placeholder="Assignment description (optional)"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Deadline *</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md mt-1"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload File *</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Upload Assignment
        </button>
      </form>

      {/* Display Uploaded Assignments */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">📚 Uploaded Assignments</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50"
              >
                <h4 className="text-xl font-bold text-blue-800">{assignment.title}</h4>
                <p className="text-gray-700">{assignment.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Deadline:</strong> {assignment.deadline}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>File:</strong> {assignment.fileName}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded on: {assignment.uploadedAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Assignments;
