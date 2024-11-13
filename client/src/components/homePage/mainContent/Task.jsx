import { FaCalendarXmark } from "react-icons/fa6";

const Task = ({ task, selectedTask, setSelectedTask, handleToggleTask }) => {
  const { id, shortDescription, longDescription, completed, dueDate } = task;

  const formattedDate = new Date(dueDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className="h-[1px] w-full bg-zinc-300"></div>
      <div
        className={`group flex my-1 p-2 cursor-pointer hover:bg-zinc-100 rounded-lg ${
          selectedTask?.id === id ? "bg-zinc-100" : ""
        }`}
        onClick={() => setSelectedTask(id)}
      >
        <div>
          <input
            type="checkbox"
            checked={completed}
            className="w-4 h-3 mr-4 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            onChange={() => handleToggleTask(id)}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <p className="truncate max-w-[500px]">{shortDescription}</p>
            <div className="flex items-center">
              <p className="text-sm text-zinc-500">{formattedDate}</p>
              <FaCalendarXmark size={16} className="ml-2 text-zinc-500" />
            </div>
          </div>
          <p className="text-sm text-zinc-500 max-w-[500px] truncate">
            {longDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
