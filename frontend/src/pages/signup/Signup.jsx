import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "./signUpUser";
import BeatLoader from "react-spinners/BeatLoader";
import { useAuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/UserContext";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useAuthContext();
  const { setFilteredUsers } = useUserContext();

  const validateBeforeSubmit = () => {
    let errorObj = {};

    // Validate fullName
    const isValidFullName = /^[A-Za-z ]+$/.test(inputs.fullName);
    if (!isValidFullName) {
      errorObj = {
        ...errorObj,
        fullName: "Full Name should contain only alphabets",
      };
    }

    //Validate username
    const isValidUsername = /[A-Za-z]/.test(inputs.username);
    if (!isValidUsername) {
      errorObj = {
        ...errorObj,
        username: "Username should contain atleast one alphabet",
      };
    }

    // Validate password
    if (inputs.password.length < 6) {
      errorObj = {
        ...errorObj,
        password: "Password must be atleast 6 characters",
      };
    }

    // Validate confirm password
    if (inputs.password !== inputs.confirmPassword) {
      errorObj = {
        ...errorObj,
        confirmPassword: "Confirm password should match with password",
      };
    }

    // Validate required for all fields
    Object.keys(inputs).map((eachInput) => {
      if (!inputs[eachInput]) {
        errorObj = { ...errorObj, [eachInput]: `This is a required field` };
      }
    });

    setFieldErrors(errorObj);

    return Object.keys(errorObj).length === 0;
  };

  const registerUser = async (eventObj) => {
    eventObj.preventDefault();
    const isValidForm = validateBeforeSubmit(inputs);
    if (isValidForm) {
      const { isValidResponse, response } = await signUpUser(
        inputs,
        setIsLoading
      );
      if (isValidResponse) {
        localStorage.setItem("currentUser", JSON.stringify(response));
        authContext.setAuthUser(response);
        authContext.setFilteredUsers(response.friends);
        toast.success(`User created successfully!!`);
        setInputs({
          fullName: "",
          username: "",
          password: "",
          confirmPassword: "",
          gender: "",
        });
      } else {
        toast.error(response.error);
      }
    } else {
      toast.error("Please correct all the errors and try again.");
    }
  };

  const changeHandler = (eventObj) => {
    setInputs((currentState) => {
      return { ...currentState, [eventObj.target.name]: eventObj.target.value };
    });
  };

  return (
    <div className="flex flex-col border border-white rounded-md p-8 mb-8 w-[300px]">
      <h1 className="text-blue-600 mx-auto text-2xl mb-4">SignUp</h1>
      <form
        className="flex flex-col"
        onSubmit={registerUser}
        onChange={changeHandler}
      >
        <div className="flex flex-col">
          <label className="mt-3 mb-1 font-bold">Full Name</label>
          <input
            className="p-2 mb-2"
            type="text"
            placeholder="Enter your full name"
            name="fullName"
          />
          {fieldErrors.fullName && (
            <p className="text-red-500">{fieldErrors.fullName}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mt-3 mb-1 font-bold">Username</label>
          <input
            className="p-2 mb-2"
            type="text"
            placeholder="Enter your username"
            name="username"
          />
          {fieldErrors.username && (
            <p className="text-red-500">{fieldErrors.username}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mt-3 mb-1 font-bold">Password</label>
          <input
            className="p-2 mb-2"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          {fieldErrors.password && (
            <p className="text-red-500">{fieldErrors.password}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mt-3 mb-1 font-bold">Confirm Password</label>
          <input
            className="p-2 mb-2"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mt-3 mb-1 font-bold">Gender</label>
          <div className="flex">
            <div className="mr-2">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={inputs.gender === "male"}
              />
              <label className="ml-2" htmlFor="male">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={inputs.gender === "female"}
              />
              <label className="ml-2" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          {fieldErrors.gender && (
            <p className="text-red-500">{fieldErrors.gender}</p>
          )}
        </div>
        <button
          className="text-white bg-blue-700 p-2 my-2 flex justify-center items-center"
          type="submit"
        >
          {isLoading ? <BeatLoader color="#35a3e3" /> : "SignUp"}
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-300 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
