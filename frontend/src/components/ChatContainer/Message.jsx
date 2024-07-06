import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { useUserContext } from '../../../context/UserContext';

const Message = ({chatMessage}) => {

    const {senderId, message, createdAt} = chatMessage;

    const {authUser} = useAuthContext();
    const {selectedConversation} = useUserContext();


    const isMessageFromAuthUser = senderId === authUser._id;
    const leftOrRightChatDisplay = isMessageFromAuthUser ? 'chat-end' : 'chat-start';
    const profilePic = isMessageFromAuthUser ? authUser.profilePic : selectedConversation.profilePic
    const name = isMessageFromAuthUser ? authUser.fullName : selectedConversation.fullName;
    const messageSentTime = `${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}`

    return (
        <div className={`chat ${leftOrRightChatDisplay} mx-4`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Profile Avatar"
                        src={`${profilePic}`} />
                </div>
            </div>
            <div className="chat-header ml-2 mb-1">
                {name}
                <time className="text-xs opacity-50 ml-2">{messageSentTime}</time>
            </div>
            <div className="chat-bubble">{message}</div>
            {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
        </div>
    )
}

export default Message