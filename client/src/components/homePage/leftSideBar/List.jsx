const List = ({ tasklists, selectedList, setSelectedList }) => {
  return (
    <div className="flex flex-col gap-2">
      {tasklists.map((tasklist, index) => (
        <div
          key={tasklist.id}
          className={`group flex justify-between items-center p-2 rounded-lg hover:bg-zinc-100 cursor-pointer ${
            selectedList === index ? "bg-zinc-100" : ""
          }`}
          onClick={() => setSelectedList(index)}
        >
          <p className="text-lg font-semibold text-zinc-800">{tasklist.name}</p>
          <p className="text-sm text-zinc-600 bg-zinc-100 py-1 px-2 rounded-lg">
            {tasklist.tasks.length}
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
