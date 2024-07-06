import React from 'react'
import ReceiverHeader from './ReceiverHeader'
import Messages from './Messages'
import SendMessage from './SendMessage.jsx'
import NoSelectedConversation from './NoSelectedConversation'
import { useUserContext } from '../../../context/UserContext'

const ChatContainer = () => {

    const {selectedConversation} = useUserContext();
    return (
        <div className='flex flex-col border rounded-md sm:w-[50%] h-[430px]'>
            {
                selectedConversation
                ?
                <>
                    <ReceiverHeader />
                    <Messages/>
                    <SendMessage />
                </>
                :
                <NoSelectedConversation />
            }
            
        </div>
    )
}

export default ChatContainer