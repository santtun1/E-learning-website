// src/components/common/AnnouncementList.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📢 Latest Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements yet.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map(({ id, title, message, createdAt }) => (
            <li key={id} className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
              <p className="text-gray-700">{message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {createdAt?.toDate().toLocaleString() ?? "Just now"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnnouncementList;
