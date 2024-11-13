import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || null
  );

  const logout = () => {
    Cookies.remove("accessToken");
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
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
