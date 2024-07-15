import React, { useState } from "react";
import { acceptFriend } from "../SideBar/acceptFriend";
import BeatLoader from "react-spinners/BeatLoader";

const FriendRequests = ({ friendRequests }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [friendRequestAccepted, setFriendRequestAccepted] = useState(false);
  const handleAcceptRequest = async (acceptFriendUserId) => {
    const isAccpeted = await acceptFriend(acceptFriendUserId, setIsLoading);
    setFriendRequestAccepted(isAccpeted);
  };

  return (
    <div>
      <dialog id="my_modal_5" className="sm:modal-middle modal">
        <div className="modal-box">
          {friendRequests.length !== 0 ? (
            friendRequests.map((friendRequest) => {
              return (
                <div className="border flex justify-evenly">
                  <p className="py-4">{friendRequest.fullName}</p>
                  <button
                    className={`flex items-center  border px-2 my-2 rounded-full text-black ${
                      friendRequestAccepted
                        ? "bg-gray-700 text-white cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    }`}
                    disabled={friendRequestAccepted}
                    onClick={() => handleAcceptRequest(friendRequest._id)}
                  >
                    {isLoading && <BeatLoader color="#FFFFFF" />}
                    {!isLoading && friendRequestAccepted
                      ? "Accepted"
                      : "Accept Friend"}
                  </button>
                </div>
              );
            })
          ) : (
            <div>
              <p>No new friend requests</p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FriendRequests;
