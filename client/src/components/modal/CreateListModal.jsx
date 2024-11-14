import { useContext, useState } from "react";
import { createTaskList } from "../../utils/taskList";
import { AuthContext } from "../../context/AuthContext";
import { TaskContext } from "../../context/taskContext";

const CreateListModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");
  const [listName, setListName] = useState("");
  const { accessToken } = useContext(AuthContext);
  const { setTaskLists } = useContext(TaskContext);

  const handleCreateTaskList = async (taskListName) => {
    await createTaskList(
      taskListName,
      setTaskLists,
      accessToken,
      setError,
      onClose,
      setListName
    );
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Create Task List
                    </h3>
                    <p className="text-sm text-zinc-500">
                      Please choose a unique name for your task list.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Task list name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={listName}
                    onChange={(e) => {
                      setError(""), setListName(e.target.value);
                    }}
                  />
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    if (!listName) {
                      setError("Please enter a list name");
                      return;
                    }
                    handleCreateTaskList(listName);
                  }}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateListModal;
