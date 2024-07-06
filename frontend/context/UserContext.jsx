import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    return <UserContext.Provider value={{users, setUsers, selectedConversation, setSelectedConversation, messages, setMessages}}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider;