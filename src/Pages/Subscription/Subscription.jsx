import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../proviers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import img from '../../assets/premium.png';
import useRole from '../../hooks/useRole';
import { Parallax } from 'react-parallax';
import Swal from 'sweetalert2'; 

const Subscription = () => {
  const { user, updateUserRole } = useContext(AuthContext);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('');
  const [subscriptionCost, setSubscriptionCost] = useState('');
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const navigate = useNavigate();
  const [role, isLoading] = useRole();

  const handlePeriodChange = (event) => {
    const period = event.target.value;
    setSubscriptionPeriod(period);

    
    let cost = '';
    let periodInMinutes = 0;

    if (period === '1min') {
      cost = 10;
      periodInMinutes = 0.5; 
    } else if (period === '1') {
      cost = 100;
      periodInMinutes = 1440; 
    } else if (period === '5') {
      cost = 500;
      periodInMinutes = 7200; 
    } else if (period === '10') {
      cost = 1000;
      periodInMinutes = 14400; 
    }

    setSubscriptionCost(cost);
  };

  const handleSubscribe = () => {
    if (!subscriptionPeriod) {
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a subscription period.',
      });
      return;
    }

    // Get the current time in UTC (ISO format)
    const currentTimeUTC = new Date().toISOString();
    let expiryTime = new Date();

    if (subscriptionPeriod === '1min') {
      expiryTime = new Date(new Date().getTime() + 30 * 1000); 
    }

    // Set subscription expiry state and navigate to payment
    setSubscriptionExpiry(expiryTime);
    navigate('/payment', { state: { subscriptionPeriod, subscriptionCost, currentTimeUTC } });
  };

  useEffect(() => {
    if (subscriptionExpiry) {
      const timer = setTimeout(() => {
        updateUserRole('viewer');
        Swal.fire({
          icon: 'info',
          title: 'Subscription Expired',
          text: 'Your subscription has expired. You have been reverted to a viewer.',
        });
        navigate('/');
      }, subscriptionExpiry - new Date());

      return () => clearTimeout(timer);
    }
  }, [subscriptionExpiry, updateUserRole, navigate]);

  const isAdmin = role === 'admin';

  return (
    <div>
        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co.com/SfRz7q8/loginbg.jpg"
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
            <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
              Choose Your Subscription Plan Here
            </h1>
          </div>
        </div>
      </Parallax>
        <div className=" my-10 flex items-center justify-center ">
      <Helmet>
        <title>Subscriptions | প্রতীক্ষা নিউজ</title>
      </Helmet>
      
      <div className="bg-teal-50 mx-3 md:mx-0 shadow-lg  rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={img}
              alt="Subscription Illustration"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Choose Your Subscription Plan
            </h2>
            <div className="mb-4">
              <label htmlFor="period" className="block font-medium text-gray-700 mb-2">
                Subscription Period
              </label>
              <select
                id="period"
                value={subscriptionPeriod}
                onChange={handlePeriodChange}
                className="border border-gray-300 rounded p-3 w-full focus:outline-blue-500"
              >
                <option value="">Select a period</option>
                <option value="1min">1 Minute</option>
                <option value="1">1 Day</option>
                <option value="5">5 Days</option>
                <option value="10">10 Days</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="cost" className="block font-medium text-gray-700 mb-2">
                Total Cost (TAKA)
              </label>
              <input
                id="cost"
                type="text"
                value={subscriptionCost}
                readOnly
                className="border border-gray-300 rounded p-3 w-full bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                readOnly
                className="border border-gray-300 rounded p-3 w-full bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleSubscribe}
              disabled={isAdmin} 
              className={`bg-teal-500 btn text-white px-6 py-3 rounded hover:bg-teal-600 w-full ${isAdmin ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {isAdmin ? <p className='text-red-600'>Admin, no need to subscribe</p> : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Subscription;
