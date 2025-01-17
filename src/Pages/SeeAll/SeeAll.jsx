import React from "react";
import { Parallax } from 'react-parallax';
import img from '../../assets/loginbg.jpg';
import logo from '../../assets/logo (1).png';

const SeeAll = () => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="background image"
      strength={-200}
    >
      <div className="hero-overlay h-[250px] md:h-[300px] bg-opacity-70 bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center">
        
        {/* Text Content */}
        <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-center">
        <img src={logo} alt="logo" className="w-14 mx-auto" />

          <h1 className="font-bold text-lg text-teal-500 md:text-4xl mt-2 md:mt-2">প্রতীক্ষা নিউজ</h1>

          <p className="my-1 text-xs md:text-base  md:text-center max-w-3xl mx-auto text-center">
            আপনাকে সর্বশেষ, প্রিমিয়াম মানের ও
            নিরবচ্ছিন্ন সংবাদ অভিজ্ঞতা প্রদান করাই আমাদের লক্ষ্য
          </p>

          <div className="join mt-4">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item" />
            <button className="btn bg-teal-500 border-none hover:bg-teal-700 join-item">Subscribe</button>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default SeeAll;
