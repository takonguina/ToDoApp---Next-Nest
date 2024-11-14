import axios from "axios";

// Create a tasklist
export const createTaskList = async (
  taskListName,
  setTaskLists,
  accessToken,
  setError,
  onClose
) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/tasklist",
      {
        name: taskListName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 201) {
      // Updating the taskLists state
      setTaskLists((prevTaskLists) => [...prevTaskLists, response.data]);
      onClose();
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      setError("Task list already exists");
    }
    console.log(error.response.data);
  }
};

// Delete task list
export const deleteTaskList = async (
  taskListId,
  accessToken,
  taskLists,
  setTaskLists
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/tasklist/${taskListId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      // Updating the taskLists state
      const updatedTaskLists = taskLists.filter(
        (taskList) => taskList.id !== taskListId
      );
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
