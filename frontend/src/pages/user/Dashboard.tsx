import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import api from "../../api"; // Import Axios instance

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setPoints(user.totalPoints || 0); // Default to 0 if not found
    }
  }, []);

  // ✅ Handle Logout Function
  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout"); // Call logout API

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");

      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <h2>Total Points: {points}</h2> {/* Display user points */}
      <button
        onClick={() => navigate("/auth/leaderboard")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Leaderboard
      </button>
      <button
        onClick={() => navigate("/auth/tasks")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        All Tasks
      </button>
      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
