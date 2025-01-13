import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import news from '../../../assets/logo (1).png'
const Navbar = () => {

    const Links = <>
    <NavLink to='/' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Home</NavLink>
    <NavLink to='/add-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Add Articles</NavLink>
    <NavLink to='/all-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>All Articles</NavLink>
    <NavLink to='/subcription' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Subscription</NavLink>
    <NavLink to='/my-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>My Articles</NavLink>
    <NavLink to='/premium-articles' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Premium Articles</NavLink>
    <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'font-bold text-[#2AB7B1]' : 'text-[#ECF0F1]'}>Dashboard</NavLink>
    </>
    return (
        <div className='bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white fixed z-50 w-full backdrop-blur opacity-80 md:py-1'>
            <div className="navbar max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {Links}
                </ul>
                </div>
                <img src={news} alt="CrowdCube Logo" className="w-6 md:w-10" />
                <Link to='/' className="text-sm px-1 md:text-xl btn btn-ghost text-[#2AB7B1]">প্রতীক্ষা নিউজ</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                {Links}
                </ul>
            </div>
            <div className="navbar-end flex gap-1 items-center">
                <Link to='/login' className="btn bg-[#2AB7B1] text-white border-none">Login</Link>
                <Link to='/register' className="btn bg-[#2AB7B1] text-white border-none">Register</Link>
            </div>
        </div>
        </div>
    );
};

export default Navbar;