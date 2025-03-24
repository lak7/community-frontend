import { useNavigate } from "react-router-dom";
// import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>
        Home componet used for login and sigup and after login if user is "user"
        then navigate to /auth/dashboard if user is "admin navigate to
        /admin/dashboard{" "}
      </p>

      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/signup")}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Signup
      </button>
    </div>
  );
};

export default Home;
