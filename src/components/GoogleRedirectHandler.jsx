import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const RedirectGoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("RedirectHandler mounted successfully");

    const queryParams = new URLSearchParams(window.location.search);

    const accessToken = queryParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      api
        .get("/api/auth/user/")
        .then((response) => {
          console.log("User data:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error(
            "Error verifying token:",
            error.response ? error.response.data : error.message
          );
          localStorage.removeItem("accessToken");
          navigate("/login");
        });
    } else {
      console.log("No token found in URL");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging In.........</div>;
};

export default RedirectGoogleAuth;
