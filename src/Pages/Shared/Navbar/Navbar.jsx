import React, { useEffect, useState } from 'react';  
import { Link, NavLink } from 'react-router-dom';
import news from '../../../assets/logo (1).png';
import { IoMdLogIn, IoMdMenu } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import avatarImg from '../../../assets/placeholder.jpg';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';
import Swal from 'sweetalert2';  
import axios from 'axios'; 

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [role, isLoading] = useRole();
    const [userData, setUserData] = useState(null); 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');  // Add theme state

    // Toggle theme on checkbox change
    const handleThemeToggle = (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                        params: { search: user.email } 
                    });
                    setUserData(data[0]); 
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUserData();
        }
    }, [user]);

    const Links = <>
        <NavLink to='/' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Home</NavLink>
        <NavLink to='/all-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>All Articles</NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Contact Us</NavLink>
        {/* after login user navlink */}
        {user && (
            <>
                <NavLink to='/add-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Add Articles</NavLink>
                <NavLink to='/subscriptions' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Subscription</NavLink>
                <NavLink to='/my-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>My Articles</NavLink>
            </>
        )}
        {/* Only for admin or premium role */}
        {(role === 'admin' || role === 'premium') && (
            <NavLink 
                to='/premium-articles' 
                className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}
            >
                Premium Articles
            </NavLink>
        )}
        {/* only for admin */}
        {role === 'admin' && (
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Dashboard</NavLink>
        )}
    </>;

    const handleLogout = () => {
        logOut();
        Swal.fire({
            title: 'Success!',
            text: 'You have logged out successfully.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position: 'center'
        });
    };

    return (
        <div className={`bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white fixed z-50 w-full backdrop-blur opacity-80 md:py-1 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <div className="navbar max-w-screen-xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <IoMdMenu size={30} color="#2AB7B1" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {Links}
                        </ul>
                    </div>
                    <img src={news} alt="logo" className="w-6 md:w-10" />
                    <Link to='/' className="text-sm px-1 md:text-xl btn btn-ghost text-[#2AB7B1]">প্রতীক্ষা নিউজ</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        {Links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-1 items-center">
                    <label className="cursor-pointer grid place-items-center">
                        <input 
                            type="checkbox" 
                            onChange={handleThemeToggle} 
                            checked={theme === "dark"} 
                            className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" 
                        />
                    </label>

                    {user ? (
                        <>
                            <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#2AB7B1] object-cover cursor-pointer" title={user.displayName}>
                                        <img alt={user.displayName} src={userData?.image || user.photoURL || avatarImg} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                                    <li><button className="btn bg-[#2AB7B1] text-white">{userData ? userData.name : user.displayName}</button></li> 
                                    <li><Link to='/profile' className="btn bg-[#2AB7B1] text-white">Profile</Link></li>
                                    <li><button onClick={handleLogout} className="btn bg-[#2AB7B1] text-white"><IoMdLogIn /> Log Out</button></li>
                                </ul>
                            </div>
                            <button onClick={handleLogout} className="btn bg-teal-500 border-none px-4 hover:bg-[#2AB7B1] text-sm text-white hidden md:block">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className="btn btn-ghost px-1 text-white border-none"><IoMdLogIn />Login</Link>
                            <Link to='/register' className="btn btn-ghost px-1 text-white border-none"><FaUserEdit />Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
