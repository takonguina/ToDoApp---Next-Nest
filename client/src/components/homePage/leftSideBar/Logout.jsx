import { useContext } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { AuthContext } from "../../../context/AuthContext";

const Logout = ({ isOpen }) => {
  const { logout } = useContext(AuthContext);
  return (
    <div
      className={`flex items-center  cursor-pointer hover:text-red-700 ${
        !isOpen ? "justify-between" : ""
      }`}
      onClick={logout}
    >
      <HiOutlineLogout size={28} />
      {isOpen && <p className="ml-4 text-lg">Disconnect</p>}
    </div>
  );
};

export default Logout;
