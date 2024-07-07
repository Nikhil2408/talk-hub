import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

const NoSelectedConversation = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <h2>Welcome {authUser.fullName}</h2>
      {authUser.friends.length === 0 ? (
        <h3>Add friends to start messaging them</h3>
      ) : (
        <h3>Select a chat to start messaging</h3>
      )}
    </div>
  );
};

export default NoSelectedConversation;
