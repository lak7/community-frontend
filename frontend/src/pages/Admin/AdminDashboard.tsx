import { useNavigate } from "react-router-dom";
import React from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <button
        onClick={() => navigate("/admin/leaderboard")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Leaderboard
      </button>

      <button
        onClick={() => navigate("/admin/tasks")}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        View Pending Tasks
      </button>

      <button
        onClick={() => navigate("/admin/create")}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        Create Task
      </button>
    </div>
  );
}
