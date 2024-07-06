import React, {useEffect, useState} from 'react';
import User from './User';
import { useUserContext } from '../../../context/UserContext';
import BeatLoader from 'react-spinners/BeatLoader';
import toast from 'react-hot-toast';

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const {users, setUsers} = useUserContext();

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                const responseObj = await fetch("http://localhost:8000/api/users", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include"
                });
                const response = await responseObj.json();
                setUsers(response);
            } catch (error) {
                toast.error("Something went wrong!! Please refresh your page");
            } finally{
                setIsLoading(false);
            }
        }
        getUsers();
    }, [])

    return (
        <div className='flex flex-col overflow-auto'>
            {
                isLoading
                ?
                <div className='flex justify-center items-center mt-4'>
                    <BeatLoader color='#35a3e3'/>
                </div>
                :
                users && users.map(user => {
                    return <User key={user._id} user = {user} />
                })
            }
        </div>
    )
}

export default Users