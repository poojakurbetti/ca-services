import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add interceptor for Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
