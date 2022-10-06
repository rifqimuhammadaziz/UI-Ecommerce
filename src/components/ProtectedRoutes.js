import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" replace={true} />;
  }

  return children;
};
