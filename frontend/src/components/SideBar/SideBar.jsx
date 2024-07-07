import React from "react";
import Search from "./Search";
import Logout from "./Logout";
import Friends from "./Friends";

const SideBar = () => {
  return (
    <div className="flex flex-col shadow-lg border">
      <Search />
      <hr className="border-t border-gray-700" />
      <Friends />
      <Logout />
    </div>
  );
};

export default SideBar;
