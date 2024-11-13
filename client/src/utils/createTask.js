import axios from "axios";

export const createTask = async (
  shortDescription,
  longDescription,
  dueDate,
  taskLists,
  setTaskLists,
  tasklistId,
  accessToken
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/task/${tasklistId}`,
      {
        shortDescription,
        longDescription,
        dueDate,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 201) {
      // Updating the taskLists state
      const updatedTaskLists = [...taskLists];
      const updatedTaskList = updatedTaskLists.find(
        (taskList) => taskList.id === tasklistId
      );
      updatedTaskList.tasks.push(response.data);
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
