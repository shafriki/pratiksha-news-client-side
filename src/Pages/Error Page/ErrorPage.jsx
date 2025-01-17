import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    useEffect(() => {
        document.title = "Error";
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            <div className="text-center">
                <iframe src="https://giphy.com/embed/C21GGDOpKT6Z4VuXyn" 
                    width="100%" height="auto" 
                    className="max-w-full h-auto md:max-w-[480px] md:h-[280px]">
                </iframe>
                
                <Link to='/'>
                    <button className='btn mt-5 px-8 py-2 bg-[#2AB7B1] border-none text-white text-sm md:text-lg hover:bg-[#21908b] '>Back To Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;