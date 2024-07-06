import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useUserContext } from '../../../context/UserContext';


const Search = () => {

    const [searchText, setSearchText] = useState("");
    const {users, filteredUsers, setFilteredUsers} = useUserContext();

    const updateUsersList = (e) => {
        if(e.target.value === ''){
            setFilteredUsers(users);
        }
        const updatedFilteredUsers = users.filter(user => {
            return user.fullName.toLowerCase().startsWith(e.target.value.toLowerCase());
        })
        setFilteredUsers(updatedFilteredUsers);
    }

    const changeHandler = (e) => {
        setSearchText(e.target.value);
        updateUsersList(e);
    }

    return (
        <div className='flex items-center justify-center gap-1.5 my-4 px-4'>
            <input className='px-4 py-2 rounded-3xl' type='text' placeholder='Search User' onChange={changeHandler} value = {searchText}/>
            <FaSearch className='h-10 w-10 p-2 hover:text-white hover:cursor-pointer hover:bg-blue-600 hover:rounded-full' onClick={updateUsersList}/>
        </div>
    )
}

export default Search