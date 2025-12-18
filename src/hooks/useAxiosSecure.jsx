// src/hooks/useAxiosSecure.js
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "https://bookcourier.vercel.app", 
  });

  
  axiosSecure.interceptors.request.use((config) => {
    
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
