import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logout from "./Logout";

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`flex flex-col justify-between transition-all duration-300 ease-in-out rounded-2xl m-4 p-4 h-[calc(100%-2rem)] bg-zinc-200 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center">
        {isOpen && <p>MENU</p>}
        <GiHamburgerMenu
          size={36}
          className={`cursor-pointer transform transition-transform duration-300 ${
            isOpen ? "" : "rotate-90"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <Logout isOpen={isOpen} />
    </div>
  );
};

export default LeftSideBar;
