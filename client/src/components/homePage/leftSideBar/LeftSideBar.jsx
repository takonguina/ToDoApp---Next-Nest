import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import List from "./List";
import Logout from "./Logout";

const LeftSideBar = ({
  tasklists,
  selectedList,
  setSelectedList,
  handleDeleteTaskList,
}) => {
  const [isOpen, setIsOpen] = useState(true);
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
      <Logout isOpen={isOpen} />
    </div>
  );
};

export default LeftSideBar;
