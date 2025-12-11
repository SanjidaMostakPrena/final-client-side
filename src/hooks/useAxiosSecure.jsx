// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
  });

  // Optional: add headers like token if needed
  axiosSecure.interceptors.request.use(config => {
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
