import React from "react";
import AdminSidebar from "./AdminSidebar";
import FacultySidebar from "./FacultySidebar";
import StudentSidebar from "./StudentSidebar";
import AdminNavbar from "./AdminNavbar";
import FacultyNavbar from "./FacultyNavbar";
import StudentNavbar from "./StudentNavbar";

const Layout = ({ role, children }) => {
  const renderSidebar = () => {
    switch (role) {
      case "admin":
        return <AdminSidebar />;
      case "faculty":
        return <FacultySidebar />;
      case "student":
        return <StudentSidebar />;
      default:
        return null;
    }
  };

  const renderNavbar = () => {
    switch (role) {
      case "admin":
        return <AdminNavbar />;
      case "faculty":
        return <FacultyNavbar />;
      case "student":
        return <StudentNavbar />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-70 bg-gray-800 text-white">
        {renderSidebar()}
      </div>
      <div className="flex-1">
        {renderNavbar()}
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
