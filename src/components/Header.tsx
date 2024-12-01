import { useState } from "react";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  // Function to toggle the menu
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <header className="bg-[#74c0fc] w-full p-2 flex items-center justify-between">
      {/* Logo */}
      <div className={`${isToggleOpen ? "hidden" : "block"} p-3 block`}>
        <Link to={"/"} className="text-[#fab005] text-2xl font-bold">
          Logo
        </Link>
      </div>

      {/* Nav menu */}
      <ul
        className={`${
          isToggleOpen ? "block" : "hidden"
        } sm:flex flex-col sm:flex-row items-center gap-x-2 w-full sm:w-auto mt-1 sm:mt-0`}
      >
        <li className="hover:bg-[#44a8f4] rounded-md">
          <Link to={"/new"} className="block text-white p-2">
            New Patient
          </Link>
        </li>
        <li className="hover:bg-[#44a8f4] rounded-md">
          <Link to={"/schedule"} className="block text-white p-2">
            Schedule Patient
          </Link>
        </li>
        <li className="hover:bg-[#44a8f4] rounded-md">
          <Link to={"/View"} className="block text-white p-2">
            View Patients
          </Link>
        </li>
      </ul>

      {/* Hamburger Icon */}
      <FaBars
        className="text-white text-2xl cursor-pointer absolute right-5 top-3 sm:hidden"
        onClick={handleToggleOpen}
      />
    </header>
  );
};

export default Header;
