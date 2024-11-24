import React from 'react';

function About() {
  return (
    <div className='max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-center font-bold text-2xl text-gray-800 mb-6'>
        Welcome to Our Tech Store
      </h1>
      <p className='text-center text-gray-600 mb-8'>
        This website is dedicated to providing top-notch technological products for online transactions.
      </p>
      <div className='text-center'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Contact Information</h2>
        <p className='text-gray-600 mb-2'>
          <strong>Phone:</strong> xxxxxxxxxx
        </p>
        <p className='text-gray-600'>
          <strong>Email:</strong> <a href='mailto:xyz@gmail.com' className='text-blue-500 hover:underline'>xyz@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default About;
