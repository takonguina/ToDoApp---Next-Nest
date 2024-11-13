import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";

// Components
import RightSideBar from "./components/homePage/rightSideBar/RightSideBar";
import LeftSideBar from "./components/homePage/leftSideBar/LeftSideBar";
import MainContent from "./components/homePage/mainContent/MainContent";

// Utils
import { toggleTask } from "./utils/toggleTask";
import { deleteTask } from "./utils/deleteTask";
import { deleteTaskList } from "./utils/deleteTaskList";
import createTaskList from "./utils/createTaskList";

const HomePage = () => {
  const { accessToken } = useContext(AuthContext);

  // States
  const [taskLists, setTaskLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Task ID
  const [selectedList, setSelectedList] = useState(null);

  const selectedTaskObj =
    taskLists[selectedList]?.tasks.find((task) => task.id === selectedTask) ||
    null;

  const handleToggleTask = async (taskId) => {
    await toggleTask(
      taskId,
      taskLists,
      selectedList,
      setTaskLists,
      accessToken
    );
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(
      taskId,
      taskLists,
      selectedList,
      setTaskLists,
      accessToken
    );
  };

  const handleCreateTaskList = async (taskListName) => {
    await createTaskList(taskListName, setTaskLists, accessToken);
  };

  const handleDeleteTaskList = async (taskListId) => {
    await deleteTaskList(taskListId, accessToken, taskLists, setTaskLists);
  };

  useEffect(() => {
    const handleTaskLists = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasklist", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
        handleDeleteTaskList={handleDeleteTaskList}
        handleCreateTaskList={handleCreateTaskList}
      />
      <MainContent
        list={taskLists[selectedList]}
        selectedTask={selectedTaskObj}
        setSelectedTask={setSelectedTask}
        handleToggleTask={handleToggleTask}
      />

      <RightSideBar
        selectedTask={selectedTaskObj}
        selectedList={selectedList}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default HomePage;
