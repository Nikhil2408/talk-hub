import React from 'react'
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

const SideBar = () => {
  return (
    <div className='flex flex-col mx-2 p-2 shadow-blue-600 shadow-lg w-[30%]'>
        <Search />
        <hr className='text-gray-300'/>
        <Users />
        <Logout />
    </div>
  )
}

export default SideBar