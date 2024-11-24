import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Auth/Authcontext';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const onSubmit = async (data) => {
    console.log("listening");
    try {
      console.log("listening");
      const userLogin = {
        UserName: data.username,
        Password: data.password
      };
      console.log("Submitting user data:", userLogin);
      const response = await axios.post("http://localhost:4001/user/login", userLogin);
      console.log("Login response:", response.data);
      login();
      setTimeout(() => {
        console.log('redirecting...');
        const from = location.state?.from?.pathname || '/';  
        navigate(from, { replace: true });
        console.log('redirected!');
      }, 1000);
    } catch (error) {
      console.error("Server error occurred:", error.response ? error.response.data : error.message);
      setLoginError('Please enter the correct Username or Password');
    }
  };



  const handleSignup = () => {
    navigate('/signup');
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
              <span className='text-sm text-red-500'>{errors.username.message}</span>
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
              <span className='text-sm text-red-500'>{errors.password.message}</span>
            )}
          </div>
          {loginError && (
            <div className='text-red-500 text-center mb-4'>
              {loginError}
            </div>
          )}
          <div className="flex items-center justify-between py-4">
            <button
              type="submit"
              className="bg-black hover:bg-black text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
