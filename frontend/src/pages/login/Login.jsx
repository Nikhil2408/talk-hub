import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState    ({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (eventObj) => {
        setInputs((currentState) => {
            return {...currentState, [eventObj.target.name]: eventObj.target.value}
        }) 
    }

    const loginUser = (eventObj) => {
        eventObj.preventDefault();
        loginUser(inputs, setIsLoading);
    }

    return (
        <div className='flex flex-col border border-white rounded-md p-8 w-[30%]'>
            <h1 className="text-blue-600 mx-auto text-2xl mb-4">Login To Chat</h1>
            <form className='flex flex-col' onChange={changeHandler} onSubmit={loginUser}>
                <div className='flex flex-col'>
                    <label className='mb-1'>Username</label>
                    <input className='p-2 mb-2' type="text" placeholder='Enter your username' name="username" value={inputs.username}/>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1'>Password</label>
                    <input className='p-2 mb-2' type="password" placeholder='Enter your password' name="password" value={inputs.password}/>
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