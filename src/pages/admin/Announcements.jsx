// src/components/admin/CreateAnnouncement.jsx
import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle, AlertCircle } from "lucide-react";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      await addDoc(collection(db, "announcements"), {
        title,
        message,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setMessage("");
      setStatus({ type: "success", message: "Announcement posted successfully!" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus({ type: "error", message: "Failed to post announcement." });
    }
  };

  return (
    <div className="max-w-8xl mx-auto mt-12 px-6 sm:px-8">
      <div className="bg-white shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📢 Create New Announcement
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Announcement Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Maintenance Downtime, Exam Schedule, New Feature Update"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message Content</label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the details of the announcement here..."
            ></textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
            >
              📤 Post Announcement
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`mt-4 flex items-center gap-2 p-3 rounded-xl text-sm font-medium ${
                status.type === "success"
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Announcement;
