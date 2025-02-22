import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import FriendRequests from "../Modals/FriendRequests";

const NotificationBell = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="-mt-2">
      <button
        class="inline-block relative"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {authUser.friendRequests.length > 0 && (
          <span class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span>
        )}
      </button>
      <FriendRequests friendRequests={authUser.friendRequests} />
    </div>
  );
};

export default NotificationBell;
