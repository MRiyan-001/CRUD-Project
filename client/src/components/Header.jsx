import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[70px] flex items-center justify-between border-b border-gray-300 px-8 md:px-16 xl:px-32 shadow bg-white">
      <h1 className="text-2xl md:text-3xl font-bold">
        Todo <span className="text-xl md:text-2xl text-[#d98c4a]">List.</span>
      </h1>
    </div>
  );
};

export default Header;
