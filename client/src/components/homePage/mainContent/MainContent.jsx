import { useContext, useState } from "react";
import Task from "./Task";
import CreateTaskModal from "../../modal/CreatTaskModal";
import { TaskContext } from "../../../context/taskContext";

const MainContent = () => {
  const { selectedTaskListObj, handleCreatTask } = useContext(TaskContext);
  const [isCompletedVisible, setIsCompletedVisible] = useState(false);

  const completedTasks = selectedTaskListObj?.tasks?.filter(
    (task) => task.completed
  );
  const incompleteTasks = selectedTaskListObj?.tasks?.filter(
    (task) => !task.completed
  );

  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex-1 m-4 p-4 h-[calc(100%-2rem)]">
      {selectedTaskListObj ? (
        <div>
          <div className="flex items-center">
            <p className="text-2xl font-bold mr-8">
              {selectedTaskListObj.name}
            </p>
            <p
              className={`text-2xl text-white py-1 px-2 rounded-lg ${
                selectedTaskListObj?.tasks?.filter((task) => !task.completed)
                  .length > 0
                  ? "bg-amber-500"
                  : "bg-green-500"
              }`}
            >
              {selectedTaskListObj?.tasks
                ? selectedTaskListObj?.tasks?.filter((task) => !task.completed)
                    .length
                : 0}
            </p>
          </div>
          <div className="flex justify-start mt-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
              onClick={() => openModal(true)} // Ouvre la modal
            >
              Add New Task
            </button>
          </div>
          <div className="flex flex-col mt-8">
            {incompleteTasks?.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
          <div>
            <button
              className="mt-4 text-blue-600"
              onClick={() => setIsCompletedVisible(!isCompletedVisible)}
            >
              {isCompletedVisible
                ? "Hide completed tasks"
                : "View completed tasks"}
            </button>

            {isCompletedVisible && (
              <div className="mt-2">
                <h2 className="text-lg font-bold">Completed Tasks</h2>
                {completedTasks?.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
          <CreateTaskModal
            isOpen={showModal}
            onClose={closeModal}
            listId={selectedTaskListObj.id}
            onConfirm={handleCreatTask}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-center">
          <p className="text-base text-[#595959]">
            No list selected. Please select a task list to display its content.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainContent;
