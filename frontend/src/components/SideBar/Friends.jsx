import React, { useEffect, useState } from "react";
import User from "./User";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

const Friends = () => {
  const { authUser } = useAuthContext();
  const { filteredUsers } = useUserContext();

  return (
    <div className="flex flex-col overflow-auto flex-1">
      {filteredUsers &&
        filteredUsers.map((user, index) => {
          return (
            <User
              key={user._id}
              user={user}
              lastIndex={index === filteredUsers.length - 1}
              isFriend={true}
            />
          );
        })}
    </div>
  );
};

export default Friends;
