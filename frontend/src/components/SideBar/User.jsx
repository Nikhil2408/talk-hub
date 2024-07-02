import React from 'react'

const User = () => {
  return (
    <div className='flex items-center gap-2 my-2 p-2 hover:bg-blue-400 hover:cursor-pointer hover:text-black'>
        <div className="avatar online">
            <div className="w-8 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
        <p className='text-lg'>Nikhil Bansal</p>
    </div>
  )
}

export default User