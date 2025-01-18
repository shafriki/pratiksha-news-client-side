import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { FaUsers, FaNewspaper, FaUserTie } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import logo from '../../assets/news.png';
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const location = useLocation(); // Get the current location

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const logOut = () => {
    // Logic for logging out
    console.log('Logging out');
  };

  const getLinkClass = (path) => {
    // Add an active class if the current route matches the link
    return location.pathname.includes(path)
      ? 'flex items-center px-4 py-2 my-5 text-gray-800 bg-[#ddf5f3] transition-colors duration-300'
      : 'flex items-center px-4 py-2 my-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300';
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className='w-full hidden md:flex px-4 py-4 shadow-lg rounded-lg justify-center items-center bg-[#ddf5f3] mx-auto'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>
          </div>

          {/* Menu Items */}
          <div className='space-y-4 mt-6'>
            <Link to='statistics' className={getLinkClass('/statistics')}>
              <RiDashboardHorizontalFill className='w-5 h-5' />
              <span className='mx-4 font-medium'>Dashboard</span>
            </Link>
            <Link to='all-users' className={getLinkClass('/all-users')}>
              <FaUsers className='w-5 h-5' />
              <span className='mx-4 font-medium'>All Users</span>
            </Link>
            <Link to='all-articles' className={getLinkClass('/all-articles')}>
              <FaNewspaper className='w-5 h-5' />
              <span className='mx-4 font-medium'>All Articles</span>
            </Link>
            <Link to='all-publishers' className={getLinkClass('/all-publishers')}>
              <FaUserTie className='w-5 h-5' />
              <span className='mx-4 font-medium'>Add Publishers</span>
            </Link>
            
          </div>
          
        </div>
        <div>
        <div className="divider"></div>
        <Link to='/' className='mx-4 font-medium hover:text-green-500'><FaHome className='w-5 h-5 inline-block mr-1'/>
        Back To Home</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
