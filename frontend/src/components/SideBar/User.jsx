import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useSocketContext } from "../../../context/SocketContext";
import { addFriend } from "./addFriend";
import BeatLoader from "react-spinners/BeatLoader";

const User = ({ user, lastIndex, isFriend }) => {
  const { profilePic, fullName } = user;
  const { selectedConversation, setSelectedConversation } = useUserContext();
  const { onlineUsers } = useSocketContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);

  const isOnline =
    isFriend &&
    onlineUsers.find((onlineUser) => {
      return onlineUser === user._id;
    });

  const isSelectedConversation =
    isFriend && selectedConversation
      ? selectedConversation._id === user._id
      : false;

  const handleAddFriend = async (friendId) => {
    const requestSent = await addFriend(setIsLoading, friendId);
    setIsFriendRequestSent(requestSent);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center gap-2 px-2 py-4 sm:flex-row ${
          isFriend
            ? "hover:bg-blue-400 hover:text-black hover:cursor-pointer"
            : ""
        }  ${isSelectedConversation ? "bg-blue-400 text-black" : ""}`}
        onClick={() => isFriend && setSelectedConversation(user)}
      >
        <div className="flex items-center flex-1">
          <div
            className={`avatar ${
              isFriend ? (isOnline ? "online" : "offline") : ""
            }`}
          >
            <div className="w-9 rounded-full">
              <img src={`${profilePic}`} />
            </div>
          </div>
          <p className="text-md ml-2">{fullName}</p>
        </div>
        {!isFriend && (
          <button
            className={`flex items-center bg-yellow-400 border px-4 py-2 rounded-full text-black ${
              isFriendRequestSent || user.alreadySent
                ? "bg-gray-700 text-white cursor-not-allowed"
                : "hover:bg-yellow-500"
            }`}
            onClick={() => handleAddFriend(user._id)}
            disabled={isFriendRequestSent}
          >
            {isLoading && <BeatLoader color="#FFFFFF" />}
            {!isLoading && (isFriendRequestSent || user.alreadySent)
              ? "Friend Request Sent"
              : "Add Friend"}
          </button>
        )}
      </div>
      {!lastIndex && <hr className="border-t border-gray-700" />}
    </>
  );
};

export default User;
