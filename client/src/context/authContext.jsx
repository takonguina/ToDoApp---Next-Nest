import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
