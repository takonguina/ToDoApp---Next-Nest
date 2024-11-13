import axios from "axios";

const createTaskList = async (taskListName, setTaskLists, accessToken) => {
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
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export default createTaskList;
