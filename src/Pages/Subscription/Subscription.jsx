import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/premium.png';
import { AuthContext } from '../../proviers/AuthProvider';

const Subscription = () => {
    const { user } = useContext(AuthContext);
    const [subscriptionPeriod, setSubscriptionPeriod] = useState('');
    const [subscriptionCost, setSubscriptionCost] = useState('');
    const navigate = useNavigate();

    const handlePeriodChange = (event) => {
        const period = event.target.value;
        setSubscriptionPeriod(period);

        // Calculate cost and convert period to time (in minutes)
        let cost = '';
        let periodInMinutes = 0;

        if (period === '1min') {
            cost = 10;
            periodInMinutes = 1; // 1 minute
        } else if (period === '1') {
            cost = 100;
            periodInMinutes = 1440; // 1 day = 1440 minutes
        } else if (period === '5') {
            cost = 500;
            periodInMinutes = 7200; // 5 days = 7200 minutes
        } else if (period === '10') {
            cost = 1000;
            periodInMinutes = 14400; // 10 days = 14400 minutes
        }

        setSubscriptionCost(cost);
    };

    const handleSubscribe = () => {
        if (!subscriptionPeriod) {
            alert('Please select a subscription period.');
            return;
        }

        // Get the current time in UTC (ISO format)
        const currentTimeUTC = new Date().toISOString();


        // Navigate to the payment page with subscription details
        navigate('/payment', { state: { subscriptionPeriod, subscriptionCost, currentTimeUTC } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Subscriptions | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
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
                            <label
                                htmlFor="period"
                                className="block font-medium text-gray-700 mb-2"
                            >
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
                            <label
                                htmlFor="cost"
                                className="block font-medium text-gray-700 mb-2"
                            >
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
                            <label
                                htmlFor="email"
                                className="block font-medium text-gray-700 mb-2"
                            >
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
                            className="bg-blue-500 btn text-white px-6 py-3 rounded hover:bg-blue-600 w-full"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
