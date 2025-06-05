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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />} />
      </Routes>
    </Router>
  );
};
export default Main;
