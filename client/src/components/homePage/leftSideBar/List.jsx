import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import DeleteModal from "../../modal/DeleteModal";

const List = ({
  tasklists,
  selectedList,
  setSelectedList,
  handleDeleteTaskList,
}) => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-2 mb-2">
      {tasklists?.map((tasklist, index) => (
        <div
          key={tasklist.id}
          className={`group flex justify-between items-center p-2 rounded-lg hover:bg-zinc-100 cursor-pointer ${
            selectedList === index ? "bg-zinc-100" : ""
          }`}
          onClick={() => setSelectedList(index)}
        >
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold text-zinc-800 mr-2">
              {tasklist.name}
            </p>
            <p
              className={`text-sm bg-zinc-100 px-1 rounded-lg ${
                selectedList === index ? "bg-zinc-200" : "bg-zinc-100"
              }`}
            >
              {tasklist?.tasks
                ? tasklist?.tasks?.filter((task) => !task.completed).length
                : 0}
            </p>
          </div>
          <IoTrash
            size={20}
            className={`text-zinc-500 hover:text-red-600 ${
              selectedList === index ? "" : "hidden"
            }`}
            onClick={() => openModal()}
          />
        </div>
      ))}

      <DeleteModal
        isOpen={showModal}
        onClose={closeModal}
        title="Delete List"
        message="Are you sure you want to delete this list? This action cannot be undone."
        onConfirm={() => handleDeleteTaskList(tasklists[selectedList].id)}
        buttonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default List;
