import React, { useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";


const SocketContext = React.createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socketConnection = io("http://localhost:8000", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketConnection);
            socketConnection.on("getOnlineUsers", (onlineUsers) => {
                setOnlineUsers(onlineUsers);
            })
            return () => socketConnection.close();
        } else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return <SocketContext.Provider value = {{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
}


export default SocketContextProvider