import React from 'react'
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

const SideBar = () => {
  return (
    <div className='flex flex-col shadow-lg border rounded-md'>
        <Search />
        <hr className='border-t border-gray-700'/>
        <Users />
        <Logout />
    </div>
  )
}

export default SideBar