import { FaCalendarXmark } from "react-icons/fa6";

const Task = ({ task, index, selectedTask, setSelectedTask }) => {
  const { shortDescription, longDescription, completed, dueDate } = task;

  const formattedDate = new Date(dueDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className="h-[1px] w-full bg-zinc-300"></div>
      <div className="flex p-2">
        <div>
          <input
            type="checkbox"
            checked={completed}
            className="w-4 h-3 mr-4 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between w-full">
            <p>{shortDescription}</p>
            <div className="flex items-center">
              <FaCalendarXmark size={16} className="mr-2 text-zinc-500" />
              <p className="text-sm text-zinc-500">{formattedDate}</p>
            </div>
          </div>
          <p className="text-sm text-zinc-500">{longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
