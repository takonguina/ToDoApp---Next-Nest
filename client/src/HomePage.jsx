// Components
import RightSideBar from "./components/homePage/rightSideBar/RightSideBar";
import LeftSideBar from "./components/homePage/leftSideBar/LeftSideBar";
import MainContent from "./components/homePage/mainContent/MainContent";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <LeftSideBar />
      <MainContent />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
