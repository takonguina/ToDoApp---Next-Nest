import { useEffect } from "react";
import api from "../../service/api";

const AxiosErrorHandler = ({ children }) => {
  useEffect(() => {
    return () => {
      api.interceptors.response.eject();
    };
  }, []);

  return children;
};

export default AxiosErrorHandler;
