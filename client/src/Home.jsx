import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      return <Navigate to="/login" />;
    }
  }, [token]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
