import React from "react";
import { FaEye, FaHeart, FaComment } from "react-icons/fa";

const Lectures = () => {
  const lectures = [
    {
      title: "Web Development Basics",
      description: "Intro to HTML, CSS, and JS.",
      thumbnail: "/web.png", // Replace with your image
      views: 500,
      likes: 120,
      comments: 30,
    },
    {
      title: "Advanced React",
      description: "Hooks, Context, performance tips.",
      thumbnail: "/advreact.png",
      views: 860,
      likes: 200,
      comments: 45,
    },
    {
      title: "Data Structures",
      description: "Linked lists, stacks, and queues.",
      thumbnail: "/dsa.png",
      views: 620,
      likes: 150,
      comments: 35,
    },
    {
      title: "Database Design",
      description: "Relational & NoSQL databases.",
      thumbnail: "/db.png",
      views: 400,
      likes: 90,
      comments: 22,
    },
    {
      title: "Machine Learning Intro",
      description: "Supervised vs Unsupervised ML.",
      thumbnail: "/ml.png",
      views: 790,
      likes: 230,
      comments: 58,
    },
    {
      title: "Cybersecurity Basics",
      description: "Learn how to secure systems.",
      thumbnail: "/cyber.png",
      views: 300,
      likes: 110,
      comments: 19,
    },
    {
      title: "Cloud Computing",
      description: "AWS, Azure, GCP overview.",
      thumbnail: "/cc.png",
      views: 980,
      likes: 300,
      comments: 70,
    },
    {
      title: "Mobile App Dev",
      description: "Build apps with Flutter.",
      thumbnail: "/mob.png",
      views: 560,
      likes: 175,
      comments: 40,
    },
    {
      title: "AI in Education",
      description: "AI’s role in modern learning.",
      thumbnail: "/ai.png",
      views: 720,
      likes: 210,
      comments: 33,
    },
  ];

  return (
    <div className="max-w-8xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Lecture Library</h2>

      <div className="grid grid-cols- sm:grid-cols-2 md:grid-cols-3 gap-8">
        {lectures.map((lecture, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={lecture.thumbnail}
              alt={lecture.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{lecture.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{lecture.description}</p>
              <div className="flex justify-between text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <FaEye /> {lecture.views}
                </span>
                <span className="flex items-center gap-1">
                  <FaHeart /> {lecture.likes}
                </span>
                <span className="flex items-center gap-1">
                  <FaComment /> {lecture.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
