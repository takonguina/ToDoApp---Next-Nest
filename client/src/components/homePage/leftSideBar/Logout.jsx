import { HiOutlineLogout } from "react-icons/hi";

const Logout = ({ isOpen }) => {
  return (
    <div
      className={`flex items-center  cursor-pointer hover:text-red-700 ${
        !isOpen ? "justify-between" : ""
      }`}
    >
      <HiOutlineLogout size={28} />
      {isOpen && <p className="ml-4">Disconnect</p>}
    </div>
  );
};

export default Logout;
