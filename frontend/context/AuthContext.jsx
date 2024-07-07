import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = React.createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

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
      } catch (error) {
        toast.error("Failed to fetch auth User details");
      }
    };
    if (authUser) {
    getAuthUser();
    }
  }, [authUser]);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
