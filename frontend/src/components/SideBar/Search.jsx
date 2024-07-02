import React from 'react';
import { FaSearch } from "react-icons/fa";


const Search = () => {
  return (
    <div className='flex items-center justify-center gap-1.5 my-4'>
        <input className='px-4 py-2 rounded-3xl' type='text' placeholder='Search User' />
        <FaSearch className='h-10 w-10 p-2 hover:text-white hover:cursor-pointer hover:bg-blue-600 hover:rounded-full'/>
    </div>
  )
}

export default Search