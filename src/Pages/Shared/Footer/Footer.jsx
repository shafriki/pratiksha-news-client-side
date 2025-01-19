import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo (1).png'


const Footer = () => {
    return (
        <div>
            {/* footer one */}
            <footer className="footer bg-base-200  p-10  bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white">

                {/* company logo section */}
                <aside>
                    <img src={logo} className='w-16 md:w-20' />
                    <p className='text-white'>
                    <span className='text-[#2AB7B1] font-extrabold text-base '>প্রতীক্ষা নিউজ</span>
                    <br />
                    আপনাকে সর্বশেষ, প্রিমিয়াম মানের ও <br />  নিরবচ্ছিন্ন সংবাদ অভিজ্ঞতা প্রদান করাই আমাদের লক্ষ্য
                    </p>
                </aside>

                {/* contact us section */}
                <nav>
                    <h6 className="footer-title text-[#2AB7B1]">Contact Us</h6>
                    <a className="link link-hover">Head office</a>
                    <a className="link link-hover flex items-center gap-1"><SiGooglemaps className='text-lg text-[#2AB7B1]'/>
                    Rajshahi, Dhaka, Bangladesh</a>
                    <a className="link link-hover flex items-center gap-1"><FaPhoneAlt className='text-[#2AB7B1]'/>
                    +88 01786141015</a>
                    <a className="link link-hover flex items-center gap-1"><FaWhatsapp className='text-lg text-[#2AB7B1]'/>
                    +88 01786141015 ( Message only )</a>
                    <a className="link link-hover flex items-center gap-1"><MdEmail className='text-lg text-[#2AB7B1]'/>
                    <p className='text-[#2AB7B1]'></p>protikshanews@gmail.com</a>

                </nav>

                {/* navlink section */}
                <nav>
                    <h6 className="footer-title text-[#2AB7B1]">প্রতীক্ষা নিউজ</h6>
                    <Link  className="link link-hover">Home</Link>
                    <Link  className="link link-hover">Add Articles</Link>
                    <Link  className="link link-hover">All Articles</Link>
                    <Link  className="link link-hover">Subscription</Link>
                    <Link  className="link link-hover">My Articles</Link>
                    <Link  className="link link-hover">Premium Articles</Link>
                </nav>

                {/* legal condition section */}
                <nav>
                    <h6 className="footer-title text-[#2AB7B1]">Legal</h6>
                    <a className="link link-hover">বিজ্ঞাপন</a>
                    <a className="link link-hover">সার্কুলেশন</a>
                    <a className="link link-hover">শর্তাবলি ও নীতিমালা</a>
                    <a className="link link-hover">গোপনীয়তা নীতি</a>
                </nav>

                </footer>

               {/* footer two */}
                    <footer className="footer-center bg-base-200 py-2 border-gray-500  bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white">
                    {/* copy right */}
                    <aside>
                        <p className='text-xs md:text-lg mb-2'>অনুসরণ করুন </p>
                    </aside>

                    {/* social icons */}
                    <nav className=''>
                        <div className="grid grid-flow-col gap-2 md:gap-4 justify-center">
                            <a><FaSquareFacebook className='text-2xl md:text-3xl text-[#2AB7B1] '/></a>

                            <a><FaSquareInstagram className='text-2xl md:text-3xl text-[#2AB7B1]'/></a>

                            <a><IoLogoYoutube className='text-2xl md:text-3xl text-[#2AB7B1]'/></a>

                            <a><IoLogoLinkedin className='text-2xl md:text-3xl text-[#2AB7B1]'/></a>

                            <a><IoLogoTwitter className='text-2xl md:text-3xl text-[#2AB7B1]'/></a>
                        </div>
                    </nav>                    
                    </footer>

                    <footer className="footer-center bg-base-200 p-2 border-gray-500 border-t bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] text-white">
                        <aside>
                            <p className='text-xs md:text-base'>স্বত্ব  © {new Date().getFullYear()} - প্রতীক্ষা নিউজ
                            সম্পাদক ও প্রকাশক: সাফরিকী ইসলাম</p>
                        </aside>
                    </footer>

        </div>
    );
};

export default Footer;