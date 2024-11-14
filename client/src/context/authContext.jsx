import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || null
  );

  const handleTokens = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate, accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, handleTokens, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
