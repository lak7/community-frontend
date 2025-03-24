
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Tasks</h2>
          <p className="text-gray-600 mb-4">
            Manage tasks for users to complete
          </p>
          <Link
            to="/admin/tasks"
            className="bg-blue-500 text-white px-4 py-2 rounded block text-center hover:bg-blue-600"
          >
            View Tasks
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Submissions</h2>
          <p className="text-gray-600 mb-4">
            Review and approve user submissions
          </p>
          <Link
            to="/admin/submissions"
            className="bg-green-500 text-white px-4 py-2 rounded block text-center hover:bg-green-600"
          >
            View Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
