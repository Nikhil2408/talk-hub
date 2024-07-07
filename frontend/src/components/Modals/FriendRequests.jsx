import React, { useState } from "react";
import { acceptFriend } from "../SideBar/acceptFriend";
import BeatLoader from "react-spinners/BeatLoader";

const FriendRequests = ({ friendRequests }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAcceptRequest = (acceptFriendUserId) => {
    acceptFriend(acceptFriendUserId, setIsLoading);
  };

  return (
    <div>
      <dialog id="my_modal_5" className="sm:modal-middle modal">
        <div className="modal-box">
          {friendRequests.length !== 0 ? (
            friendRequests.map((friendRequest) => {
              return (
                <>
                  <p className="py-4">{friendRequest.fullName}</p>
                  <button
                    onClick={() => handleAcceptRequest(friendRequest._id)}
                  >
                    {isLoading ? (
                      <BeatLoader color="#FFFFFF" />
                    ) : (
                      "Accept Friend"
                    )}
                  </button>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </>
              );
            })
          ) : (
            <div>
              <p>No new friend requests</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default FriendRequests;
