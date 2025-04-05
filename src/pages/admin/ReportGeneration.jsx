import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportGeneration = () => {
  // Dummy data
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Faculty' },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Admin' },
  ];

  const courses = [
    { id: 'C101', title: 'Intro to AI', instructor: 'Dr. Alan', duration: '6 weeks' },
    { id: 'C102', title: 'Web Development', instructor: 'Prof. Smith', duration: '8 weeks' },
    { id: 'C103', title: 'Data Science', instructor: 'Dr. Jane', duration: '10 weeks' },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('📄 Admin Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    // Users Table
    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Name', 'Email', 'Role']],
      body: users.map((user) => [user.id, user.name, user.email, user.role]),
      theme: 'striped',
      headStyles: { fillColor: [63, 81, 181] },
    });

    // Courses Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Course ID', 'Title', 'Instructor', 'Duration']],
      body: courses.map((course) => [
        course.id,
        course.title,
        course.instructor,
        course.duration,
      ]),
      theme: 'striped',
      headStyles: { fillColor: [0, 150, 136] },
    });

    doc.save('admin-report.pdf');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl mx-auto bg-white shadow-xl  p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Report Generation</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">User Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{user.id}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-green-600">Course Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg text-left">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 border">Course ID</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Instructor</th>
                  <th className="px-4 py-2 border">Duration</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{course.id}</td>
                    <td className="px-4 py-2 border">{course.title}</td>
                    <td className="px-4 py-2 border">{course.instructor}</td>
                    <td className="px-4 py-2 border">{course.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={generatePDF}
          className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300"
        >
          📥 Download Report as PDF
        </button>
      </div>
    </div>
  );
};

export default ReportGeneration;
