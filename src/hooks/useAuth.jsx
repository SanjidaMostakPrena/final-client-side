import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
