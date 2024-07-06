import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from './loginUser';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAuthContext } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const [fieldErrors, setFieldErrors] = useState({});

    const changeHandler = (eventObj) => {
        setInputs((currentState) => {
            return {...currentState, [eventObj.target.name]: eventObj.target.value}
        }) 
    }

    const validateLoginForm = (inputs) => {
        let errorObj = {};
        Object.keys(inputs).forEach(eachInput => {
            if(!inputs[eachInput])
                errorObj = {...errorObj, [eachInput]: "This is required field"}
        })
        setFieldErrors(errorObj);
        return Object.keys(errorObj).length === 0;
    }

    const handleLoginUser = async (eventObj) => {
        eventObj.preventDefault();
        const isValidLoginForm = validateLoginForm(inputs);
        if(isValidLoginForm){
            const {isValidResponse, response} = await loginUser(inputs, setIsLoading);
            if(isValidResponse){
                localStorage.setItem("currentUser", JSON.stringify(response));
                setAuthUser(response);
                toast.success("Login Successfull!")
            } else{
                toast.error(response.error);
            }
        } else{
            toast.error("Please correct all the errors and try again.");
        }
    }

    return (
        <div className='flex flex-col border border-white rounded-md p-8 w-[30%]'>
            <h1 className="text-blue-600 mx-auto text-2xl mb-4">Login To Chat</h1>
            <form className='flex flex-col' onChange={changeHandler} onSubmit={handleLoginUser}>
                <div className='flex flex-col'>
                    <label className='mb-1'>Username</label>
                    <input className='p-2 mb-2' type="text" placeholder='Enter your username' name="username"/>
                    {fieldErrors.username && <p className='text-red-500'>{fieldErrors.username}</p>}
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1'>Password</label>
                    <input className='p-2 mb-2' type="password" placeholder='Enter your password' name="password"/>
                    {fieldErrors.password && <p className='text-red-500'>{fieldErrors.password}</p>}
                </div>
                <button className='text-white bg-blue-700 p-2 my-2' type="submit">
                    {isLoading ? <BeatLoader color='#35a3e3'/> : "Login"}
                </button>
            </form>
            <p className='mt-2'>Don't have an account? <Link to="/signup" className='text-blue-300 hover:underline'>Sign Up</Link></p>
        </div>
    )
}

export default Login