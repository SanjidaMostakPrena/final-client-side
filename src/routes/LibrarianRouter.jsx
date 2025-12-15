import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const LibrarianRouter = ({ children }) => {
  const { user, role } = useAuth(); // get the role from your Auth context

  // allow access if role is 'librarian' OR 'admin'
  if (!user || (role !== "librarian" && role !== "admin")) {
    return <Navigate to="/dashboard" />; // redirect if unauthorized
  }

  return children;
};

export default LibrarianRouter;

