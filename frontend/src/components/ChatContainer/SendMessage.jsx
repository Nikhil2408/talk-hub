import React from 'react';
import { IoSendSharp } from "react-icons/io5";


const SendMessage = () => {
  return (
    <div className='flex items-center'>
        <input type="text" className='w-full outline-none p-2' placeholder='Type a message'/>
        <IoSendSharp className='-ml-6 hover:cursor-pointer hover:text-blue-500'/>
    </div>
  )
}

export default SendMessage