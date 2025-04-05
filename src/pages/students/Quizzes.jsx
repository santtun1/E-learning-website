import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const snapshot = await getDocs(collection(db, "quizzes"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleChangeAnswer = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = async () => {
    let newScore = 0;
    selectedQuiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswerIndex) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);

    const user = auth.currentUser;
    if (user) {
      // Save submission
      const submissionRef = doc(
        collection(db, "submissions", user.uid, "quizSubmissions"),
        selectedQuiz.id
      );

      await setDoc(submissionRef, {
        userId: user.uid,
        quizId: selectedQuiz.id,
        answers,
        score: newScore,
        submittedAt: serverTimestamp(),
      });

      // Save to leaderboard
      const leaderboardRef = doc(
        collection(db, "leaderboard", selectedQuiz.id, "scores"),
        user.uid
      );

      const prevScoreSnap = await getDoc(leaderboardRef);
      if (!prevScoreSnap.exists() || prevScoreSnap.data().score < newScore) {
        await setDoc(leaderboardRef, {
          userId: user.uid,
          userEmail: user.email,
          score: newScore,
          total: selectedQuiz.questions.length,
          updatedAt: serverTimestamp(),
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      {!selectedQuiz ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Available Quizzes</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="p-4 border rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition"
                onClick={() => handleSelectQuiz(quiz)}
              >
                <h3 className="text-lg font-semibold text-blue-600">{quiz.title}</h3>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">{selectedQuiz.title}</h2>
          <div className="space-y-6">
            {selectedQuiz.questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <p className="font-medium mb-4 text-lg">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = submitted && optIndex === q.correctAnswerIndex;
                    const isWrong =
                      submitted &&
                      answers[qIndex] === optIndex &&
                      optIndex !== q.correctAnswerIndex;
                    return (
                      <div key={optIndex}>
                        <label
                          className={`inline-flex items-center px-3 py-2 w-full rounded-lg border cursor-pointer transition
                            ${
                              isCorrect
                                ? "bg-green-100 border-green-500 text-green-700 font-semibold"
                                : ""
                            }
                            ${
                              isWrong
                                ? "bg-red-100 border-red-500 text-red-700 line-through"
                                : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            checked={answers[qIndex] === optIndex}
                            onChange={() => handleChangeAnswer(qIndex, optIndex)}
                            className="mr-3"
                            disabled={submitted}
                          />
                          {opt}
                        </label>
                      </div>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-2 text-sm text-gray-600">
                    ✅ Correct Answer:{" "}
                    <span className="font-semibold">
                      {q.options[q.correctAnswerIndex]}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <div className="text-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-lg shadow-md"
              >
                Submit Quiz
              </button>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <p className="text-green-700 text-lg font-semibold">
                🎉 Quiz Submitted! You scored {score} out of{" "}
                {selectedQuiz.questions.length}
              </p>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="mt-4 text-blue-500 underline hover:text-blue-700"
              >
                ← Back to Quiz List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
