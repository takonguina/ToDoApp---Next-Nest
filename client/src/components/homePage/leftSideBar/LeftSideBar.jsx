import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";

import List from "./List";
import Logout from "./Logout";
import CreateListModal from "../../modal/CreateListModal";

const LeftSideBar = ({
  tasklists,
  selectedList,
  setSelectedList,
  handleDeleteTaskList,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div
      className={`flex flex-col justify-between transition-all duration-300 ease-in-out rounded-xl m-4 p-4 h-[calc(100%-2rem)] bg-zinc-200 ${
        isOpen ? "w-80" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center">
        {isOpen && <p className="text-2xl font-bold text-[#595959]">Menu</p>}
        <GiHamburgerMenu
          size={36}
          className={`cursor-pointer transform transition-transform duration-300 ${
            isOpen ? "" : "rotate-90"
          }`}
          style={{ color: "#595959" }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <List
          tasklists={tasklists}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          handleDeleteTaskList={handleDeleteTaskList}
        />
      )}
      <IoIosAddCircle
        size={36}
        className="cursor-pointer"
        onClick={() => openModal()}
      />
      <CreateListModal isOpen={showModal} onClose={closeModal} />
      <Logout isOpen={isOpen} />
    </div>
  );
};

export default LeftSideBar;
