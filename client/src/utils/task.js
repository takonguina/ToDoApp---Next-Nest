import axios from "axios";

// creat task
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

// toggle task status
export const toggleTask = async (
  taskId,
  taskLists,
  selectedList, // id of the selected task list
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
      // Updating the taskLists state
      const updatedTaskLists = [...taskLists];
      const selectedListObject = updatedTaskLists.find(
        (list) => list.id === selectedList
      );
      const updatedTask = selectedListObject.tasks.find(
        (task) => task.id === taskId
      );
      updatedTask.completed = !updatedTask.completed;
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

// Delete a task
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
      const selectedListObject = updatedTaskLists.find(
        (list) => list.id === selectedList
      );
      selectedListObject.tasks = selectedListObject.tasks.filter(
        (task) => task.id !== taskId
      );
      setTaskLists(updatedTaskLists);
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
