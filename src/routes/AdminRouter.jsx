import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AdminRouter = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default AdminRouter;
