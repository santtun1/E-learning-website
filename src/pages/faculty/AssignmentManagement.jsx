import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const  AssignmentManagement = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState(""); // external file link
  const [assignments, setAssignments] = useState([]);

  const handleUpload = async () => {
    if (!title || !deadline) {
      alert("Please fill in the title and deadline.");
      return;
    }

    try {
      await addDoc(collection(db, "assignments"), {
        title,
        deadline,
        link,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDeadline("");
      setLink("");
      alert("Assignment uploaded successfully!");
      fetchAssignments();
    } catch (error) {
      console.error("Error uploading assignment:", error);
      alert("Failed to upload assignment.");
    }
  };

  const fetchAssignments = async () => {
    const snapshot = await getDocs(collection(db, "assignments"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAssignments(data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-md  p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Assignment Manager</h2>

      {/* Upload Form */}
      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="url"
          placeholder="Optional: File URL (e.g. Google Drive link)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Upload Assignment
        </button>
      </div>

      {/* Uploaded Assignments */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Uploaded Assignments</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((a) => (
              <li
                key={a.id}
                className="p-4 border rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-lg">{a.title}</h4>
                  <p className="text-sm text-gray-600">
                    Deadline: {a.deadline}
                  </p>
                  {a.link && (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Assignment File
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssignmentManagement;
