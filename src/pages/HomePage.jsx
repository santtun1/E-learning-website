import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "🎓 Personalized Learning",
      desc: "Get course recommendations tailored to your interests and background.",
    },
    {
      title: "🧑‍🏫 Expert Instructors",
      desc: "Learn from experienced professionals and professors across various domains.",
    },
    {
      title: "📈 Track Progress",
      desc: "Monitor your learning journey with real-time dashboards and analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-30 animate-ping delay-200"></div>

      {/* Navbar */}
      <nav className="bg-white bg-opacity-90 backdrop-blur-lg shadow-md px-8 py-4 flex justify-between items-center z-10 relative">
        <h1 className="text-2xl font-bold text-blue-800">📘 E-Learnify</h1>
        <div className="space-x-4">
          <button onClick={() => navigate("/")} className="text-gray-700 font-medium hover:text-blue-600">
            Home
          </button>
          <button onClick={() => navigate("/courses")} className="text-gray-700 font-medium hover:text-blue-600">
            Courses
          </button>
          <button onClick={() => navigate("/login")} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
          📚 E-Learning Platform
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mb-8">
          Empowering students and faculty through digital learning, tailored recommendations, and smart progress tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
         
      
        </div>
      </div>

      {/* Login Role Section */}
      <section className="py-16 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">🔐 Login As</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            onClick={() => navigate("/login?role=student")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Student Login
          </button>
          <button
            onClick={() => navigate("/login?role=faculty")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Faculty Login
          </button>
          <button
            onClick={() => navigate("/login?role=admin")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Admin Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">✨ Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
