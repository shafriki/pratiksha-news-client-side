import React from 'react';
import { Parallax } from 'react-parallax';
import useAuth from '../Hooks/useAuth';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">

      {/* detail info banner */}
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co/SfRz7q8/loginbg.jpg"  // Fixed the image URL
        bgImageAlt="background image"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
            {/* Add additional content or text if needed */}
          </div>
        </div>
      </Parallax>

      {/* details card */}
      <div className="absolute top-[8rem] md:top-[12rem] left-[50%] transform -translate-x-1/2 bg-white bg-opacity-40 p-8 rounded-lg shadow-xl w-[40%] text-center backdrop-blur-md">
        
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
          
          <img alt={user.displayName} src={user.photoURL || avatarImg} className="w-full h-full rounded-full border-4 border-blue-500 object-cover" />

          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        {user.displayName}
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mb-4">{user.email}</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="btn border-none bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
            Update Profile
          </button>
          <button className="btn md:px-10 bg-green-500 hover:bg-green-600 border-none text-white">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
