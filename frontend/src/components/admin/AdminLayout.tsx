// import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/index";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
      ? "bg-blue-500 text-white"
      : "text-gray-600 hover:bg-gray-100";
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="py-4">
          <ul>
            <li>
              <Link
                to="/admin"
                className={`block px-4 py-2 ${isActive("/admin")}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/tasks"
                className={`block px-4 py-2 ${isActive("/admin/tasks")}`}
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/admin/submissions"
                className={`block px-4 py-2 ${isActive("/admin/submissions")}`}
              >
                Submissions
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Admin</h2>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
