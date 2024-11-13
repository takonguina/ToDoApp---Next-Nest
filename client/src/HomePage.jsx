import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";

// Components
import RightSideBar from "./components/homePage/rightSideBar/RightSideBar";
import LeftSideBar from "./components/homePage/leftSideBar/LeftSideBar";
import MainContent from "./components/homePage/mainContent/MainContent";

const HomePage = () => {
  const { accessToken } = useContext(AuthContext);

  // States
  const [taskLists, setTaskLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const handleTaskLists = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasklist", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          setTaskLists(response.data);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleTaskLists();
    if (!accessToken) {
      <Navigate to="/login" />;
    }
  }, [accessToken]);

  return (
    <div className="flex h-screen">
      <LeftSideBar
        tasklists={taskLists}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
      <MainContent
        list={taskLists[selectedList]}
        task={taskLists[selectedList]?.tasks[selectedTask] || null}
        setSelectedTask={setSelectedTask}
      />
      <RightSideBar />
    </div>
  );
};

export default HomePage;
