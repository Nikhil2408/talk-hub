import React from 'react'
import ReceiverHeader from './ReceiverHeader'
import Messages from './Messages'
import SendMessage from './SendMessage'

const ChatContainer = () => {
  return (
    <div className='flex flex-col ml-2 w-[50%] border'>
        <ReceiverHeader />
        <Messages/>
        <SendMessage />
    </div>
  )
}

export default ChatContainer