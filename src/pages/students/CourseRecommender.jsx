import React, { useState } from "react";
import axios from "axios";

const CourseRecommender = () => {
  const [interest, setInterest] = useState("");
  const [pastEnrollment, setPastEnrollment] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const interests = [
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
  ];

  const pastCourses = [
    "Python for Beginners",
    "HTML & CSS",
    "Intro to Java",
    "Linux Basics",
    "Computer Networks",
    "Database Management",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuggestions([]);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://suggestion-rho.vercel.app/webhook", {
        queryResult: {
          parameters: {
            interest,
            pastEnrollment,
          },
        },
      });

      const message = response.data?.fulfillmentText || "No suggestions found.";
      const list = message
        .split(/[\n•\-]+/)
        .map((item) => item.trim())
        .filter((item) => item !== "");

      setSuggestions(list);
    } catch (err) {
      console.error("Frontend Error:", err);
      setError("⚠️ Failed to fetch suggestions. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] pt-1 pb-12 px-4 flex justify-center">
      <div className="w-full max-w-8xl bg-white  shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🎓 Personalized Course Recommender
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Your Interest</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose an Interest --</option>
              {interests.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Past Enrollments</label>
            <select
              value={pastEnrollment}
              onChange={(e) => setPastEnrollment(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a Past Course --</option>
              {pastCourses.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Fetching Suggestions..." : "Get Suggestions"}
          </button>
        </form>

        {/* Output */}
        {suggestions.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 p-5 rounded-xl text-gray-800">
            <h4 className="text-xl font-semibold text-blue-800 mb-3">🔍 Suggested Courses:</h4>
            <ul className="list-disc list-inside space-y-2 text-base">
              {suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CourseRecommender;
