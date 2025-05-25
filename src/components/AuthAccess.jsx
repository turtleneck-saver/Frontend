import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

const ProtectedRoute = (children) => {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <div>로그인 해라</div>;
  }

  if (
    isAuthorized &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/register")
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
