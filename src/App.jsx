import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "./auth";
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
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
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<ProtectedRegister />} />
      </Routes>
    </Router>
  );
};
export default Main;
