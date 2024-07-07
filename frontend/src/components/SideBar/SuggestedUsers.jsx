import React, { useEffect, useState } from "react";
import User from "./User";
import { useUserContext } from "../../../context/UserContext";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";

const SuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { users, setUsers } = useUserContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const isRequestAlreadySent = (user) => {
      return authUser.friendRequestsSent.some((sentId) => sentId === user._id);
    };
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const responseObj = await fetch("/api/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const response = await responseObj.json();
        const updatedResponse = response.map((user) => {
          if (isRequestAlreadySent(user)) {
            return { ...user, alreadySent: true };
          } else {
            return { ...user, alreadySent: false };
          }
        });
        setUsers(updatedResponse);
      } catch (error) {
        toast.error("Something went wrong!! Please refresh your page");
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [authUser]);

  return (
    <div className="flex flex-col overflow-auto flex-1 border my-4 w-[90%] sm:w-[40%]">
      <h3 className="self-center text-lg my-4 font-bold">Suggested Users</h3>
      <hr className="border-t border-gray-700" />
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <BeatLoader color="#FFFFFF" />
        </div>
      ) : (
        users &&
        users.map((user, index) => {
          return (
            <User
              key={user._id}
              user={user}
              lastIndex={index === users.length - 1}
            />
          );
        })
      )}
    </div>
  );
};

export default SuggestedUsers;
