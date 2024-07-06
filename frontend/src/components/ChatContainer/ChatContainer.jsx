import React from 'react'
import ReceiverHeader from './ReceiverHeader'
import Messages from './Messages'
import SendMessage from './SendMessage'
import NoSelectedConversation from './NoSelectedConversation'
import { useUserContext } from '../../../context/UserContext'

const ChatContainer = () => {

    const {selectedConversation} = useUserContext();
    return (
        <div className='flex flex-col ml-2 w-[50%] border'>
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