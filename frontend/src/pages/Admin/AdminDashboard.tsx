import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-white">Manage Tasks</h2>
          <p className="text-gray-400 mb-5">
            Create, edit and delete tasks for users to complete
          </p>
          <Link
            to="/admin/tasks"
            className="bg-gray-800 text-white px-5 py-3 rounded-md block text-center hover:bg-gray-700 transition-colors"
          >
            View Tasks
          </Link>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-white">
            Review Submissions
          </h2>
          <p className="text-gray-400 mb-5">
            Approve or reject user submissions
          </p>
          <Link
            to="/admin/submissions"
            className="bg-gray-800 text-white px-5 py-3 rounded-md block text-center hover:bg-gray-700 transition-colors"
          >
            View Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
