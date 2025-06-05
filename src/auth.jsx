import { createContext, useState, useContext, useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./token";
import { jwtDecode } from "jwt-decode";
import api from "./api";

const AuthContext = createContext({
  isAuthorized: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
          setUser(decoded);
        }
      } catch (error) {
        logout();
      }
    } else {
      logout();
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        const decoded = jwtDecode(res.data.access);
        setIsAuthorized(true);
        setUser(decoded);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
    }
    return false;
  };

  const login = async (credentials) => {
    try {
      let res;
      if (credentials.google_token) {
        res = await api.post("/api/google/login/", {
          access_token: credentials.google_token,
        });
      } else {
        res = await api.post("/api/token/", credentials);
      }

      localStorage.setItem(ACCESS_TOKEN, res.data.access);

      if (res.data.refresh) {
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      }

      await checkAuth();
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthorized(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();

    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        user,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
