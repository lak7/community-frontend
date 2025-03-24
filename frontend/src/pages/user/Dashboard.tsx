import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import React from "react";

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
    </div>
  );
};

export default Dashboard;
