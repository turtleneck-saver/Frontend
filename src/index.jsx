import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import * as Pages from "./pages";
import { useAuth } from "./auth";
const Main = () => {
  const { isAuthorized } = useAuth();
  const ProtectedLogin = () => {
    return isAuthorized ? (
      <Navigate to="/dashboard" />
    ) : (
      <AuthPage initialMethod="login" />
    );
  };
  const ProtectedRegister = () => {
    return isAuthorized ? (
      <Navigate to="/" />
    ) : (
      <AuthPage initialMethod="register" />
    );
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
      </Routes>
    </Router>
  );
};

const appDiv = document.getElementById("app");
render(<Main />, appDiv);
