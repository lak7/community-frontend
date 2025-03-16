import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Corrected import
import Home from "./pages/user/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/user/Dashboard";
import Leaderboard from "./pages/user/Leaderboard";
import AllTasks from "./pages/user/AllTasks";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLeadboard from "./pages/Admin/AdminLeadboard";
import CreateTasks from "./pages/Admin/CreateTasks";
import AllSubmitTasks from "./pages/Admin/AllSubmitTasks";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Routes */}
      <Route path="/auth/dashboard" element={<Dashboard />} />
      <Route path="/auth/leaderboard" element={<Leaderboard />} />
      <Route path="/auth/tasks" element={<AllTasks />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/leaderboard" element={<AdminLeadboard />} />
      <Route path="/admin/create" element={<CreateTasks />} />
      <Route path="/admin/tasks" element={<AllSubmitTasks />} />
    </Routes>
  );
}

export default App;


