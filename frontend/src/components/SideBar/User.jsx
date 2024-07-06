import React from 'react'
import { useUserContext } from '../../../context/UserContext';
import { useSocketContext } from '../../../context/SocketContext';

const User = ({user, lastIndex}) => {
    const {profilePic, fullName} = user;
    const {selectedConversation, setSelectedConversation} = useUserContext();
    const {onlineUsers} = useSocketContext();

    console.log(onlineUsers);
    const isOnline = onlineUsers.find((onlineUser) => {
        return onlineUser === user._id;
    })

    const isSelectedConversation = selectedConversation ? selectedConversation._id === user._id : false;
    return (
        <>
            <div className={`flex items-center gap-2 px-2 py-4 hover:bg-blue-400 hover:text-black hover:cursor-pointer  ${isSelectedConversation ? 'bg-blue-400 text-black' : ''}`}
            onClick={() => setSelectedConversation(user)}
            >
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className="w-9 rounded-full">
                        <img src={`${profilePic}`} />
                    </div>
                </div>
                <p className='text-md'>{fullName}</p>
            </div>
            {!lastIndex && <hr className='border-t border-gray-700'/>}
        </>
        
    )
}

export default User