// import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

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
import AdminLeaderboard from "./pages/Admin/AdminLeadboard";
import EditTaskPage from "./pages/Admin/EditTaskPage";
import TasksPage from "./pages/Admin/TaskPage";
import NewTaskPage from "./pages/Admin/NewTaskPage";
import SubmissionsPage from "./pages/Admin/SubmissionsPage";

// Helper function to get user details
const getUserInfo = () => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("userRole");
  return { isAuthenticated: !!user, role };
};

// Middleware to protect user routes
const RequireAuth = () => {
  const { isAuthenticated, role } = getUserInfo();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

// Middleware to protect admin routes
const RequireAdmin = () => {
  const { isAuthenticated, role } = getUserInfo();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/auth/dashboard" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected User Routes */}
      <Route path="/auth" element={<RequireAuth />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="tasks" element={<AllTasks />} />
        <Route path="submissions" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/auth/dashboard" replace />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="leaderboard" element={<AdminLeaderboard />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/new" element={<NewTaskPage />} />
          <Route path="tasks/:taskId/edit" element={<EditTaskPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
