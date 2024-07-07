import React, { useEffect, useState } from "react";
import User from "./User";
import { useAuthContext } from "../../../context/AuthContext";

const Friends = () => {
  const { authUser } = useAuthContext();
  const { friends } = authUser;

  return (
    <div className="flex flex-col overflow-auto flex-1">
      {friends &&
        friends.map((user, index) => {
          return (
            <User
              key={user._id}
              user={user}
              lastIndex={index === friends.length - 1}
              isFriend={true}
            />
          );
        })}
    </div>
  );
};

export default Friends;
