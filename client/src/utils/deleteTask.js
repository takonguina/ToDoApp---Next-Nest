import axios from "axios";

export const deleteTask = async (
  taskId,
  taskLists,
  selectedList,
  setTaskLists,
  accessToken
) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      // Updating the taskLists state
      const updatedTaskLists = [...taskLists];
      updatedTaskLists[selectedList].tasks = updatedTaskLists[
        selectedList
      ].tasks.filter((task) => task.id !== taskId);
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
