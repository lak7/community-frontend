import axios from "axios";
import { LINK } from "../constant";

const api = axios.create({
  baseURL: LINK, // Your Express server URL
  withCredentials: true, // Important for cookies!
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", error);
    return Promise.reject(error);
  }
);

export default api;
