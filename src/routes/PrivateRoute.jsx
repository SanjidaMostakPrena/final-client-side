import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <span className="loading loading-spinner"></span>;

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
