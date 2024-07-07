import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import SuggestedUsers from "../../components/SideBar/SuggestedUsers";
import NotificationBell from "../../components/SideBar/NotificationBell";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <div className="flex justify-center items-center text-center text-wrap">
        <h1 className="mb-4 mx-2 text-xl">Welcome To Chat Room</h1>
        <NotificationBell />
      </div>
      <SuggestedUsers />
      <div className="flex flex-col justify-center mx-4 gap-2 sm:flex-row sm:gap-0 w-[90%]">
        <SideBar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;
