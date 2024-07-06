import {useEffect} from "react";
import { useSocketContext } from "../../../context/SocketContext"
import { useUserContext } from "../../../context/UserContext";


export const useGetNewMessage = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useUserContext();

    useEffect(() => {
        if(socket){
            socket.on("newMessage", (newMessage) => {
                setMessages([...messages, newMessage]);
            })
        }
        return () => socket?.off("newMessage")
    }, [socket, messages, setMessages])
}