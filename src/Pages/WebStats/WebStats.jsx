import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import LoadingSpinner from '../../Components/LoadingSpinner';

const WebStats = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        viewers: 0,
        premiumUsers: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                
                const { data: totalUsersData } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
                
                const { data: viewersData } = await axios.get(`${import.meta.env.VITE_API_URL}/viewer-users`);
                
                const { data: premiumUsersData } = await axios.get(`${import.meta.env.VITE_API_URL}/premium-users`);

                
                setStats({
                    totalUsers: totalUsersData.length,
                    viewers: viewersData.length,
                    premiumUsers: premiumUsersData.length,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center my-10 md:my-20">
                <p>Error fetching data: {error}</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <h2 className="text-2xl md:text-4xl mb-8 font-bold text-center">Our Growing Community
            </h2>
            <div className="flex justify-center flex-col gap-5 md:flex-row items-center  p-8 bg-[#2AB7B1] ">
                {/* Statistics */}
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 border-x-4 border-teal-500 rounded py-5  opacity-90 bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16]">
                    <div className="p-6 rounded-lg text-center">
                        <h3 className="text-2xl text-teal-500 font-semibold">Total Users</h3>
                        <p className="text-4xl font-bold text-teal-500 mt-2">
                            <CountUp start={0} end={stats.totalUsers} duration={2} separator="," />
                        </p>
                    </div>
                    <div className="p-6 rounded-lg text-center">
                        <h3 className="text-2xl text-teal-500 font-semibold">Viewer Users</h3>
                        <p className="text-4xl font-bold text-teal-500 mt-2">
                            <CountUp start={0} end={stats.viewers} duration={2} separator="," />
                        </p>
                    </div>
                    <div className="p-6 rounded-lg text-center">
                        <h3 className="text-2xl text-teal-500 font-semibold">Premium Users</h3>
                        <p className="text-4xl font-bold text-teal-500 mt-2">
                            <CountUp start={0} end={stats.premiumUsers} duration={2} separator="," />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebStats;
