import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="mb-4 text-4xl font-bold text-blue-700">Library Management System</h1>
        <p className="text-lg text-gray-700">Welcome to the Library Management System. Please login or register to continue.</p>
      </div>
    </>
  );
};

export default Home;
