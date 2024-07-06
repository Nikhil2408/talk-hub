import React, {useState} from 'react'
import SideBar from '../../components/SideBar/SideBar'
import ChatContainer from '../../components/ChatContainer/ChatContainer'
import { useUserContext } from '../../../context/UserContext'

const Home = () => {

    return (
        <div className='flex flex-col w-[80%]'>
            <div className='flex justify-center items-center'>
                <h1 className='mb-2 mx-2 text-xl'>Welcome To Chat Room</h1>
            </div>
            <div className='flex h-[480px] justify-center'>
                <SideBar />
                <ChatContainer />
            </div>
        </div>
    )
}

export default Home