import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[70px] flex items-center justify-between border-b border-gray-300 px-8 md:px-16 xl:px-32 shadow bg-white">
      <h1 className="text-2xl md:text-3xl font-bold">
        Todo <span className="text-xl md:text-2xl text-[#d98c4a]">List.</span>
      </h1>

      <ul className="flex items-center gap-4">
        <li>
          <NavLink
            className={({ isActive }) =>
              `hover:bg-orange-300 hover:text-white px-2 py-1.5 rounded ${
                isActive && "text-white font-semibold bg-[#d98c4a]"
              }`
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `hover:bg-orange-300 hover:text-white px-2 py-1.5 rounded ${
                isActive && "text-white font-semibold bg-[#d98c4a]"
              }`
            }
            to={"/tasks"}
          >
            Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
