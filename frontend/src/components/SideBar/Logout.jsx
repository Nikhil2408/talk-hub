import React from 'react'
import { TbLogout2 } from "react-icons/tb";


const Logout = () => {
  return (
    <div className='p-2 mt-8 flex gap-1.5 hover:bg-red-700 hover:cursor-pointer text-white'>
        <TbLogout2 className='w-6 h-6'/>
        <p>Logout</p>
    </div>
  )
}

export default Logout