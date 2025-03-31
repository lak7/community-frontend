import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { LoginFormData, User } from "../interfaces/types";
import { LINK } from "../constant";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "paras022chatan@gamil.com",
    password: "paras0422",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Sending login request with:", formData);

      const response = await api.post<User>(`${LINK}/api/auth/login`, formData);

      console.log("Login response:", response.data);

      // Store user info (not token) in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      // document.cookie=JSON.stringify(response.data);
      console.log("Lakshay ", response.data.role);
      localStorage.setItem("userRole", response.data.role);
      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/auth/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass-container max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold neon-text">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="dark-input appearance-none rounded-md relative block w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="dark-input appearance-none rounded-md relative block w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div
              className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded-md"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="glow-button blue group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-sm text-center">
            <a
              href="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
