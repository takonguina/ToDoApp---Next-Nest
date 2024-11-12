import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

// Components
import RightSideBar from "./components/homePage/rightSideBar/RightSideBar";
import LeftSideBar from "./components/homePage/leftSideBar/LeftSideBar";
import MainContent from "./components/homePage/mainContent/MainContent";

const HomePage = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      <Navigate to="/login" />;
    }
  }, [token]);

  return (
    <div className="flex h-screen">
      <LeftSideBar />
      <MainContent />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
