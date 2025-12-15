// src/hooks/useAxiosSecure.js
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // <-- backend port
  });

  // Optional: add headers like token if needed
  axiosSecure.interceptors.request.use((config) => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
