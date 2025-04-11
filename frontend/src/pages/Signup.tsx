import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Use configured axios instance
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;

      // Send signup request
      const response = await api.post("/api/auth/signup", {
        ...submitData,
        role: "user",
      });

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userRole", response.data.role); // Store role

      toast.success("Registration successful! Redirecting...");
      navigate("/auth/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Signup Error:", error.response.data);
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass-container max-w-md w-full p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center neon-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(
            [
              "name",
              "email",
              "username",
              "password",
              "confirmPassword",
            ] as const
          ).map((field) => {
            const labelMap: Record<string, string> = {
              name: "Full Name",
              email: "Email Address",
              username: "Username",
              password: "Password",
              confirmPassword: "Confirm Password",
            };

            return (
              <div key={field} className="mb-4">
                <label
                  className="block text-gray-300 mb-2 text-sm font-medium"
                  htmlFor={field}
                >
                  {labelMap[field]}
                </label>
                <input
                  id={field}
                  type={
                    field.includes("password")
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="dark-input w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  required
                  minLength={6}
                  placeholder={labelMap[field]}
                />
              </div>
            );
          })}

          <button
            type="submit"
            disabled={loading}
            className="glow-button green w-full py-3 px-4 rounded-md font-medium flex items-center justify-center mt-6"
          >
            {loading ? (
              <>
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
                Creating Account...
              </>
            ) : (
              <>
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
                Create Account
              </>
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:text-blue-300">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
