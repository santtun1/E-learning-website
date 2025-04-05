import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const StudentTracking = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all quizzes for dropdown
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesSnapshot = await getDocs(collection(db, "quizzes"));
        const quizList = quizzesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizList);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      }
    };

    fetchQuizzes();
  }, []);

  // Load leaderboard when quizId changes
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!selectedQuizId) return;

      setLoading(true);
      try {
        const leaderboardRef = collection(
          db,
          "leaderboard",
          selectedQuizId,
          "scores"
        );
        const q = query(leaderboardRef, orderBy("score", "desc"), limit(10));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        setScores(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
        setScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedQuizId]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📊 Student Tracking</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select a Quiz:
        </label>
        <select
          value={selectedQuizId}
          onChange={(e) => setSelectedQuizId(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">-- Choose a quiz --</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title || quiz.id}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading leaderboard...</div>
      ) : selectedQuizId && scores.length === 0 ? (
        <div className="text-center text-gray-500">No scores yet for this quiz.</div>
      ) : (
        scores.length > 0 && (
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">
              🏆 Top Scorers
            </h2>
            <ul className="divide-y divide-gray-200">
              {scores.map((score, index) => (
                <li
                  key={index}
                  className="py-2 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700">
                    #{index + 1} - {score.userEmail || "Anonymous"}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {score.score} / {score.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default StudentTracking;
