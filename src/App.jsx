import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Layout from "./components/Layout";
import { auth, db } from "./firebase";

// Student feature pages
import CourseRecommender from "./pages/students/CourseRecommender";
import Lectures from "./pages/students/Lectures";
import Assignments from "./pages/students/Assignments";
import Quizzes from "./pages/students/Quizzes";
import Grades from "./pages/students/Grades";
import AnnouncementList from "./pages/students/AnnouncementList";
import CourseEnroll from "./pages/students/CourseEnroll";

//faculty features pages
import CourseCreation from "./pages/faculty/CourseCreation";
import AssignmentManagement from "./pages/faculty/AssignmentManagement";
import QuizCreator from "./pages/faculty/QuizCreator";
import StudentTracking from "./pages/faculty/StudentTracking";
import CreateCourse from "./pages/faculty/CreateCourse";

//Admin feature pages
import UserManagement from "./pages/admin/UserManagement";
import ReportGeneration from "./pages/admin/ReportGeneration";
import Announcements from "./pages/admin/Announcements";
import CourseManagement from "./pages/admin/CourseManagement";
import SystemSettings from "./pages/admin/SystemSettings"; 
import Logs from "./pages/admin/Logs"; 

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const role = await getUserRole(currentUser.uid);
        setUser(currentUser);
        setRole(role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getUserRole = async (uid) => {
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data().role : null;
  };

  const getDashboard = () => {
    switch (role) {
      case "admin":
        return <Layout role="admin"><AdminDashboard /></Layout>;
      case "faculty":
        return <Layout role="faculty"><FacultyDashboard /></Layout>;
      case "student":
        return <Layout role="student"><StudentDashboard /></Layout>;
      default:
        return <Navigate to="/login" />;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={user ? getDashboard() : <Navigate to="/login" state={{ from: location }} />}
      />

      {/* Student Role Specific Pages */}
      {role === "student" && (
        <>
         
          <Route path="/student/courseenroll" element={<Layout role="student"><CourseEnroll /></Layout>} />
          <Route path="/student/lectures" element={<Layout role="student"><Lectures /></Layout>} />
          <Route path="/student/assignments" element={<Layout role="student"><Assignments /></Layout>} />
          <Route path="/student/quizzes" element={<Layout role="student"><Quizzes /></Layout>} />
          <Route path="/student/grades" element={<Layout role="student"><Grades /></Layout>} />
          <Route path="/student/courseRecommender" element={<Layout role="student"><CourseRecommender /></Layout>} />
          <Route path="/student/announcementlist" element={<Layout role="student"><AnnouncementList /></Layout>} />
        </>
      )}

      {/* Admin Specific Routes */}
    {user && role === "admin" && (
    <>
    <Route path="/admin/user-management" element={<Layout role="admin"><UserManagement /></Layout>} />
    <Route path="/admin/report-generation" element={<Layout role="admin"><ReportGeneration /></Layout>} />
    <Route path="/admin/announcements" element={<Layout role="admin"><Announcements /></Layout>} />
    <Route path="/admin/coursemanagement" element={<Layout role="admin"><CourseManagement /></Layout>} />
    <Route path="/admin/systemsettings" element={<Layout role="admin"><SystemSettings /></Layout>} />
    <Route path="/admin/logs" element={<Layout role="admin"><Logs/></Layout>} />

  </>
)}
  
   {/* faculty Specific Routes */}
{user && role === "faculty" && (
  <>
    <Route path="/faculty/course-creation" element={<Layout role="faculty"><CourseCreation /></Layout>} />
    <Route path="/faculty/assignment-management" element={<Layout role="faculty"><AssignmentManagement /></Layout>} />
    <Route path="/faculty/quizCreator" element={<Layout role="faculty"><QuizCreator /></Layout>} />
    <Route path="/faculty/student-tracking" element={<Layout role="faculty"><StudentTracking /></Layout>} />
    <Route path="/faculty/announcementlist" element={<Layout role="faculty"><AnnouncementList /></Layout>} />
    <Route path="/faculty/createcourse" element={<Layout role="faculty"><CreateCourse  /></Layout>} />
    
  </>
)}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
