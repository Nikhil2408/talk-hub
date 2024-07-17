import React, { useState } from "react";
import toast from "react-hot-toast";
import { TbLogout2 } from "react-icons/tb";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setUsers, setSelectedConversation, setMessages, setFilteredUsers } =
    useUserContext();

  async function logoutHandler() {
    setIsLoading(true);
    try {
      const responseObj = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const response = await responseObj.json();
      localStorage.removeItem("currentUser");
      setAuthUser(null);
      toast.success(response.message);
      setUsers([]);
      setSelectedConversation(null);
      setMessages([]);
      setFilteredUsers([]);
    } catch (error) {
      toast.error("Error while logging out, please try again!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="p-2 mt-8 flex gap-1.5 hover:bg-red-700 hover:cursor-pointer text-white"
      onClick={logoutHandler}
    >
      <TbLogout2 className="w-6 h-6" />
      <p>{isLoading ? <BeatLoader color="#FFFFFF" /> : "Logout"}</p>
    </div>
  );
};

export default Logout;
