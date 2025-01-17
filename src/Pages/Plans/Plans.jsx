import React from 'react';
import free from '../../../src/assets/Generic News General News YouTube Banner in Dark Blue Red White Modern Style.png';
import premium from '../../../src/assets/premium.png';
import { IoBookmarks } from "react-icons/io5";
import { TfiMoney } from "react-icons/tfi";
import { Link } from 'react-router-dom';

const Plans = () => {
    return (
        <div className='flex flex-col relative mb-[64rem] md:mb-[30rem] items-center'>
            {/* banner section */}
            <div className='min-h-[14rem]  w-full bg-slate-800'>
                <h1 className='text-3xl bg-opacity-80 text-white font-bold py-2 text-center bg-[#2AB7B1] mt-10'>Subcription Plan</h1>

                <p className='text-sm text-white text-center mt-4'>Revolutionize your news experience with trending articles, premium features, seamless design, and unlimited possibilities!</p>
            </div>

            {/* cards section */}
            <div className='flex absolute top-[11rem] md:top-[10rem] flex-col md:flex-row gap-10'>
                {/* card for normal users */}
                <div className="card rounded-none cursor-pointer group bg-base-100 w-80 shadow-xl">
                <figure>
                    <img
                    src={free}
                    alt="Shoes" className='group-hover:scale-110' />
                </figure>
                <div className="card-body bg-[#e2f6f5]">
                    <h2 className="card-title"><span className='font-light'>FREE PLAN</span> <TfiMoney className='text-[#2AB7B1] font-extrabold'/>
                    00</h2>
                    <div className="divider divider-info"></div>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    View trending articles</p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Read free articles </p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Basic article search features.</p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    View all publishers and their content.</p>
                    <Link  to='/subscriptions' className='btn rounded-none font-light hover:bg-[#1e837e] bg-[#2AB7B1]'>SEE PLAN</Link>

                </div>
                </div>


                {/* card for premium users */}
                <div className="card rounded-none cursor-pointer group bg-base-100 w-80 shadow-xl">
                <figure>
                    <img
                    src={premium}
                    alt="Shoes" className='group-hover:scale-110' />
                </figure>
                <div className="card-body bg-[#e2f6f5]">
                    <h2 className="card-title"><span className='font-light'>PREMIUM PLAN</span> <TfiMoney className='text-[#2AB7B1] font-extrabold'/>
                    500 TK</h2>
                    <div className="divider divider-info"></div>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Unlimited access to articles</p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Priority access to trending content </p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Ability to publish unlimited articles</p>
                    <p className='text-sm text-gray-500'><IoBookmarks className='inline-block text-[#2AB7B1] mr-1 '/>
                    Unlimited access to premium articles</p>
                    <Link  to='/subscriptions' className='btn rounded-none font-light hover:bg-[#1e837e] bg-[#2AB7B1]'>SEE PLAN</Link>

                </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;