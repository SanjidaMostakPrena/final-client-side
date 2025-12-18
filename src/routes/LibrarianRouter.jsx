import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const LibrarianRouter = ({ children }) => {
  const { user, role } = useAuth();

  if (!user || (role !== "librarian" && role !== "admin")) {
    return <Navigate to="/dashboard" />; // redirect unauthorized users
  }

  return children;
};

export default LibrarianRouter;
