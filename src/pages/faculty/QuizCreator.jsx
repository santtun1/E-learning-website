import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const QuizCreator = () => {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    if (questionText && options.every(opt => opt !== "") && correctAnswerIndex !== null) {
      const newQuestion = {
        question: questionText,
        options,
        correctAnswerIndex
      };
      setQuestions([...questions, newQuestion]);
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswerIndex(null);
    } else {
      alert("Please fill all fields and select the correct answer.");
    }
  };

  const handleSaveQuiz = async () => {
    if (!title || questions.length === 0) {
      alert("Please enter a quiz title and at least one question.");
      return;
    }

    try {
      await addDoc(collection(db, "quizzes"), {
        title,
        courseId,
        createdBy: "faculty_uid_placeholder",
        createdAt: serverTimestamp(),
        questions
      });
      alert("Quiz saved successfully!");
      setTitle("");
      setCourseId("");
      setQuestions([]);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Failed to save quiz.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-md rounded-xl p-8 my-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create a New Quiz</h2>

      {/* Quiz Info */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Course ID"
          value={courseId}
          onChange={e => setCourseId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Question Form */}
      <div className="bg-gray-50 p-6 rounded-md shadow-inner mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Question</h3>
        <input
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={e => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <select
          value={correctAnswerIndex !== null ? correctAnswerIndex : ""}
          onChange={e => setCorrectAnswerIndex(parseInt(e.target.value))}
          className="w-full p-3 mt-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Correct Answer</option>
          {options.map((_, index) => (
            <option key={index} value={index}>{`Option ${index + 1}`}</option>
          ))}
        </select>

        <button
          onClick={handleAddQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200 mx-auto block"
        >
          Add Question
        </button>
      </div>

      {/* Preview Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-800">Questions Preview</h3>
        {questions.length > 0 ? (
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {questions.map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No questions added yet.</p>
        )}
      </div>

      {/* Submit Quiz */}
      <button
        onClick={handleSaveQuiz}
        className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md font-semibold text-lg transition duration-200 mx-auto block"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreator;
