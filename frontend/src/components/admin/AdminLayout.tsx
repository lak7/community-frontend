// import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/index";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "bg-gray-800 text-white"
      : "text-gray-300 hover:bg-gray-800 hover:text-white transition-colors";
  };

  const handleLogout = async () => {
    try {
      await api.get(`/api/auth/logout`); // Call backend logout
      localStorage.removeItem("user"); // Remove user from localStorage
      localStorage.removeItem("userRole"); // Remove role data
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wide">ADMIN</h1>
        </div>
        <nav className="py-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className={`flex items-center px-6 py-3 text-sm font-medium ${isActive(
                  "/admin"
                )}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tasks"
                className={`flex items-center px-6 py-3 text-sm font-medium ${isActive(
                  "/admin/tasks"
                )}`}
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/admin/submissions"
                className={`flex items-center px-6 py-3 text-sm font-medium ${isActive(
                  "/admin/submissions"
                )}`}
              >
                Submissions
              </Link>
            </li>
            <li>
              <Link
                to="/admin/leaderboard"
                className={`flex items-center px-6 py-3 text-sm font-medium ${isActive(
                  "/admin/leaderboard"
                )}`}
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Admin Panel</h2>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
