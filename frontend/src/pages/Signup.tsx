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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {(
          ["name", "email", "username", "password", "confirmPassword"] as const
        ).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor={field}>
              {field}
            </label>
            <input
              id={field}
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
