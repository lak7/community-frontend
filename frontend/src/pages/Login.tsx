// // import { useState, useEffect } from "react";
// // import { useForm } from "react-hook-form";
// // import { toast } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";
// import { LINK } from "../constant";
// // import React from "react";
// // interface LoginFormData {
// //   email: string;
// //   password: string;
// // }

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isValid },
// //   } = useForm<LoginFormData>({ mode: "onChange" });

// //   const [loading, setLoading] = useState(false);
// //   const [user, setUser] = useState(() => {
// //     // Retrieve user data from localStorage if available
// //     const savedUser = localStorage.getItem("user");
// //     return savedUser ? JSON.parse(savedUser) : null;
// //   });

// //   useEffect(() => {
// //     // Redirect if user is already logged in
// //     if (user) {
// //       navigate(user.role === "admin" ? "/admin/dashboard" : "/auth/dashboard");
// //     }
// //   }, [user, navigate]);

// //   const onSubmit = async (data: LoginFormData) => {
// //     if (!isValid) return;
// //     setLoading(true);

// //     try {
// //       const response = await fetch(`${LINK}/api/auth/login`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify(data),
// //       });

// //       const result = await response.json();
// //       console.log(result);

// //       if (response.ok) {
// //         toast.success("Login Successful!");
// //         localStorage.setItem("user", JSON.stringify(result)); // Save user session
// //         setUser(result); // Update state
// //       } else {
// //         toast.error(result.message || "Login failed. Please try again.");
// //       }
// //     } catch (error) {
// //       toast.error("Network error. Please check your connection.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-screen bg-gray-100">
// //       <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
// //         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
// //           Login
// //         </h2>

// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               {...register("email", {
// //                 required: "Email is required",
// //                 pattern: {
// //                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                   message: "Invalid email address",
// //                 },
// //               })}
// //               className="mt-1 p-3 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             {errors.email?.message && (
// //               <p className="text-red-500 text-sm">{errors.email.message}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               {...register("password", { required: "Password is required" })}
// //               className="mt-1 p-3 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
// //             />
// //             {errors.password?.message && (
// //               <p className="text-red-500 text-sm">{errors.password.message}</p>
// //             )}
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold transition"
// //             disabled={loading || !isValid}
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>

// //         <p className="text-center text-gray-600 mt-4">
// //           Don't have an account?{" "}
// //           <a href="/register" className="text-blue-500 hover:underline">
// //             Sign up
// //           </a>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${LINK}/api/auth/login`,
//         formData,
//         { withCredentials: true } // Important for cookies
//       );
//       console.log("response: ", response);

//       // Store user data in localStorage or context
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data));

//       // Redirect based on role
//       if (response.data.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/auth/dashboard");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </div>

//           <div className="text-sm text-center">
//             <a
//               href="/register"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Don't have an account? Register
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { LoginFormData, User } from '../interfaces/types';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Sending login request with:', formData);
      
      const response = await api.post<User>(
        '/api/auth/login',
        formData
      );
      
      console.log('Login response:', response.data);
      
      // Store user info (not token) in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Redirect based on role
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/auth/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Your existing return JSX...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-sm text-center">
            <a>
            
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;