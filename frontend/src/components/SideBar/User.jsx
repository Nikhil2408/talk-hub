import React from 'react'
import { useUserContext } from '../../../context/UserContext';
import { useSocketContext } from '../../../context/SocketContext';

const User = ({user}) => {
    const {profilePic, fullName} = user;
    const {selectedConversation, setSelectedConversation} = useUserContext();
    const {onlineUsers} = useSocketContext();

    console.log(onlineUsers);
    const isOnline = onlineUsers.find((onlineUser) => {
        return onlineUser === user._id;
    })

    const isSelectedConversation = selectedConversation ? selectedConversation._id === user._id : false;
    return (
        <div className={`flex items-center gap-2 my-2 p-2 hover:bg-blue-400 hover:cursor-pointer hover:text-black ${isSelectedConversation ? 'bg-blue-400 text-black' : ''}`}
        onClick={() => setSelectedConversation(user)}
        >
            <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                <div className="w-8 rounded-full">
                    <img src={`${profilePic}`} />
                </div>
            </div>
            <p className='text-lg'>{fullName}</p>
        </div>
    )
}

export default User