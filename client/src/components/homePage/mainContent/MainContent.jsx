import Task from "./Task";

const MainContent = ({ list, selectedTask, setSelectedTask }) => {
  return (
    <div className="flex-1 m-4 p-4 h-[calc(100%-2rem)]">
      {list ? (
        <div>
          <div className="flex items-center">
            <p className="text-2xl font-bold mr-8">{list.name}</p>
            <p className="text-2xl bg-zinc-100 py-1 px-2 rounded-lg">
              {list.tasks.length}
            </p>
          </div>
          <div className="flex flex-col mt-8">
            {list.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            ))}
          </div>
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
