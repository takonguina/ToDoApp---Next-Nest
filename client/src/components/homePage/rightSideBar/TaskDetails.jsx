import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import DeleteModal from "../../modal/DeleteModal";

const TaskDetails = ({ selectedTask, handleDeleteTask }) => {
  // Destructuring the selected task
  const { shortDescription, longDescription, createdAt } = selectedTask;

  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Formatting the date
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-between h-full pt-4">
      <div>
        <p className="text-right text-xs text-zinc-700">
          Created on {formattedDate}
        </p>
        <p className="py-2 font-semibold">{shortDescription}</p>
        <p className="text-sm text-zinc-500">Description :</p>
        <p className="text-sm">{longDescription}</p>
      </div>
      <div
        className="group flex justify-center items-center bg-zinc-50 py-2 px-12 rounded-lg hover:bg-red-600 hover:text-zinc-50 cursor-pointer"
        onClick={() => openModal()}
      >
        <IoTrash size={20} className="mr-2" />
        <p className="font-bold">Delete Task</p>
      </div>
      <DeleteModal
        isOpen={showModal}
        onClose={closeModal}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={() => handleDeleteTask(selectedTask.id)}
        buttonText="Delete"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default TaskDetails;
