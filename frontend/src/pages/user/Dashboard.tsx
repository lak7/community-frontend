import { useNavigate } from "react-router-dom";
import React from "react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
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
