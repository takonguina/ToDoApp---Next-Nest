import api from "../service/api";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { createTask, toggleTask, deleteTask } from "../utils/task";
import { createTaskList, deleteTaskList } from "../utils/taskList";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  // States
  const [taskLists, setTaskLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Task ID
  const [selectedList, setSelectedList] = useState(null); // TaskList ID

  const selectedTaskListObj = taskLists.find(
    (taskList) => taskList.id === selectedList
  );

  const selectedTaskObj =
    selectedTaskListObj?.tasks?.find((task) => task.id === selectedTask) ||
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
  const handleCreatTask = async (
    shortDescription,
    longDescription,
    dueDate
  ) => {
    await createTask(
      shortDescription,
      longDescription,
      dueDate,
      taskLists,
      setTaskLists,
      selectedList,
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
        const response = await api.get("http://localhost:3000/tasklist", {
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
    if (accessToken) {
      handleTaskLists();
    }
    if (!accessToken) {
      <Navigate to="/login" />;
      return;
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        taskLists,
        setTaskLists,
        selectedList,
        setSelectedList,
        selectedTask,
        setSelectedTask,
        handleDeleteTaskList,
        handleCreateTaskList,
        handleDeleteTask,
        handleCreatTask,
        handleToggleTask,
        selectedTaskObj,
        selectedTaskListObj,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
