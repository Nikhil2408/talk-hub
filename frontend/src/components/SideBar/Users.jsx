import React, {useEffect, useState} from 'react';
import User from './User';
import { useUserContext } from '../../../context/UserContext';
import BeatLoader from 'react-spinners/BeatLoader';
import toast from 'react-hot-toast';

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {users, setUsers, filteredUsers, setFilteredUsers} = useUserContext();

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                const responseObj = await fetch("/api/users", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include"
                });
                const response = await responseObj.json();
                setUsers(response);
                setFilteredUsers(response);
            } catch (error) {
                toast.error("Something went wrong!! Please refresh your page");
            } finally{
                setIsLoading(false);
            }
        }
        getUsers();
    }, [])

    return (
        <div className='flex flex-col overflow-auto flex-1'>
            {
                isLoading
                ?
                <div className='flex justify-center items-center mt-4'>
                    <BeatLoader color='#FFFFFF'/>
                </div>
                :
                filteredUsers && filteredUsers.map((user, index) => {
                    return <User key={user._id} user = {user} lastIndex={index === users.length - 1}/>
                })
            }
        </div>
    )
}

export default Users