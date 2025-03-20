import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// User Pages
import Home from "./pages/user/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/user/Dashboard";
import Leaderboard from "./pages/user/Leaderboard";
import AllTasks from "./pages/user/AllTasks";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLeaderboard from "./pages/Admin/AdminLeadboard"; // Fixed typo
import EditTaskPage from "./pages/Admin/EditTaskPage";
import TasksPage from "./pages/Admin/TaskPage"; // Ensure the correct file name
import NewTaskPage from "./pages/Admin/NewTaskPage";
import SubmissionsPage from "./pages/Admin/SubmissionsPage";

// Auth middleware (placeholder - implement actual auth check)
const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user") !== null;
  console.log(`Authentication check: ${isAuthenticated}`);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin middleware (placeholder - implement actual admin check)
const RequireAdmin = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user") !== null;
  const isAdmin = localStorage.getItem("userRole") === "admin";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/auth/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}
        <Route
          path="/auth"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="tasks" element={<AllTasks />} />
          <Route path="submissions" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/auth/dashboard" replace />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="leaderboard" element={<AdminLeaderboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/new" element={<NewTaskPage />} />
          <Route path="tasks/:taskId/edit" element={<EditTaskPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}

export default App;
