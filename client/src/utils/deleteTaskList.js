import axios from "axios";

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
