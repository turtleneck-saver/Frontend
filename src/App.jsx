import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import InitAngle from "./pages/InitAngle"; // 초기 각도 설정 페이지
import PredictAngle from "./pages/PredictAngle"; // 실시간 예측 페이지
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/init-angle" element={<InitAngle />} /> {/* ✅ 추가 */}
        <Route path="/predict-angle" element={<PredictAngle />} />{" "}
        {/* ✅ 추가 */}
      </Routes>
    </Router>
  );
};

export default Main;
