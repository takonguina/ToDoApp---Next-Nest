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
  const [selectedTask, setSelectedTask] = useState(null); // Task ID
  const [selectedList, setSelectedList] = useState(null);

  const selectedTaskObj =
    taskLists[selectedList]?.tasks.find((task) => task.id === selectedTask) ||
    null;

  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);

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
        selectedTask={selectedTaskObj}
        setSelectedTask={setSelectedTask}
      />

      <RightSideBar
        selectedTask={selectedTaskObj}
        selectedList={selectedList}
      />
    </div>
  );
};

export default HomePage;
