import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "./UserContext";

const AuthContext = React.createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const { setFilteredUsers } = useUserContext();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const responseObj = await fetch("/api/auth", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const response = await responseObj.json();
        setAuthUser(response);
        setFilteredUsers(response.friends);
      } catch (error) {
        toast.error("Failed to fetch auth User details");
      }
    };
    if (authUser?._id) {
      getAuthUser();
    }
  }, [authUser?._id]);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
