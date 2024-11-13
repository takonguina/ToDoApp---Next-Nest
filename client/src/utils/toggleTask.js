import axios from "axios";

export const toggleTask = async (
  taskId,
  taskLists,
  selectedList,
  setTaskLists,
  accessToken
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/task/${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      const updatedTaskLists = [...taskLists];
      const updatedTask = updatedTaskLists[selectedList].tasks.find(
        (task) => task.id === taskId
      );
      updatedTask.completed = !updatedTask.completed;
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
