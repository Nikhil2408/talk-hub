import React, {useEffect, useState} from 'react'
import Message from './Message'
import { useUserContext } from '../../../context/UserContext';
import MessagesShimmer from '../Shimmers/MessagesShimmer';
import StartConversation from './StartConversation';

const Messages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {selectedConversation, messages, setMessages} = useUserContext();

    useEffect(() => {
        const getMessages = async () => { 
            setIsLoading(true);
            try {
                const responseObj = await fetch(`http://localhost:8000/api/messages/${selectedConversation?._id}`, {
                    method: 'GET',
                    headers: {"Content-Type": "application/json"},
                    credentials: "include"
                });
                const response = await responseObj.json();
                setMessages(response.messages);
            } catch (error) {
                
            } finally{
                setIsLoading(false);
            }
        }
        if(selectedConversation?._id){
            getMessages();
        }
    }, [selectedConversation?._id])

    return (
        <div className='flex flex-col overflow-auto flex-1'>
            {isLoading && Array(4).fill().map((el, index) => <MessagesShimmer index = {index}/>)}
            {!isLoading && messages.length === 0 && <StartConversation />}
            {!isLoading && messages.length > 0 &&
                messages.map(chatMessage => {
                    return <Message chatMessage = {chatMessage}/>
                })
            }
        </div>
    )
}

export default Messages