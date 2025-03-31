import { useNavigate } from "react-router-dom";
// import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="glass-container p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 neon-text">Welcome</h1>
        <p className="text-center text-gray-300 mb-8">
          Your portal to complete tasks and climb the leaderboard. Login or sign
          up to begin your journey.
        </p>

        <div className="space-y-4 w-full">
          <button
            onClick={() => navigate("/login")}
            className="glow-button blue w-full py-3 px-6 rounded-lg text-lg font-medium flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="glow-button green w-full py-3 px-6 rounded-lg text-lg font-medium flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Sign Up
          </button>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Task Portal. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
