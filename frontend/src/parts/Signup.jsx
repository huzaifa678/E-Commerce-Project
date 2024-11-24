import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ SignupError, SetSignupError ] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      UserName: data.username,
      Email: data.email,
      Password: data.password
    };
    console.log(userData);
    try {
      const response = await axios.post("http://localhost:4001/user/signup", userData);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      console.log("Server response:", response.data);
    } catch (error) {
      console.log("An error has occurred in the server: ", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        SetSignupError('Username and Password already exists');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Please enter your Username" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
              autoComplete='username'
            />
            {errors.username && (
              <span className='text-sm text-red-500'>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email", { required: "Please enter your Email" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              autoComplete='email'
            />

            {errors.email && (
              <span className='text-sm text-red-500'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Please enter your Password" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              autoComplete='new-password'
            />
            {errors.password && (
              <span className='text-sm text-red-500'>
                {errors.password.message}
              </span>
            )}
          </div>
          { SignupError && (
            <div className='text-red-500 text-center mb-4'>
              {SignupError}
            </div>
          )}
          <div className="flex items-center justify-between py-4">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

