import TaskDetails from "./TaskDetails";

const RightSideBar = ({ selectedTask, selectedList, handleDeleteTask }) => {
  return (
    <div
      className={`m-4 p-4 rounded-xl transition-all duration-300 ease-in-out bg-zinc-200 ${
        selectedList !== null ? "w-64" : "w-0 hidden"
      }`}
    >
      {selectedTask ? (
        <div className="h-[calc(100%-2rem)]">
          <p className="text-lg font-bold text-zinc-700">Task :</p>
          <TaskDetails
            selectedTask={selectedTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      ) : (
        <p className="text-zinc-500">
          No task selected. Please select a task to interact with.
        </p>
      )}
    </div>
  );
};

export default RightSideBar;
