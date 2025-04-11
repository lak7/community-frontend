// Get the base URL based on environment
const getBaseUrl = () => {
  // For production on Vercel
  if (import.meta.env.PROD) {
    return "https://community-frontend-f890.onrender.com";
  }
  // For local development
  return "http://localhost:4000";
};

export const LINK = getBaseUrl();
