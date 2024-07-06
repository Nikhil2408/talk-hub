import React from 'react'
import { useUserContext } from '../../../context/UserContext'

const ReceiverHeader = () => {
    const {selectedConversation} = useUserContext();
    return (
        <div className='flex bg-blue-400 p-2'>
            <p>To: {selectedConversation?.fullName}</p>
        </div>
    )
}

export default ReceiverHeader