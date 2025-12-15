import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const UserRouter = ({ children }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>; 
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;


  if (role !== "user") return <Navigate to="/" replace />;

 
  return children;
};

export default UserRouter;
