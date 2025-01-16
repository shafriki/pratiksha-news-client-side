import React from 'react';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { MdLabelImportant } from "react-icons/md";

const Latest = () => {
    return (
        <div className='flex  mb-5 items-center gap-2 bg-base-200 p-2 text-xs md:text-base bg-gradient-to-r from-[#070A16] via-[#070A16] to-[#070A16] opacity-90 text-white sticky top-[65px] md:top-[78px] z-40'>
            <p className='bg-[#2AB7B1] px-4 py-2 font-extrabold text-[#070A16] whitespace-nowrap'>শিরোনাম:</p>

            <Marquee autoFill='true' pauseOnHover='true'>
                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    জগন্নাথ বিশ্ববিদ্যালয় সেনাবাহিনীকে কাজ হস্তান্তরের আশ্বাসে অনশন প্রত্যাহার, বুধবার পর্যন্ত শাটডাউন
                </Link>

                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    সচিবালয়ের সামনে আমরণ অনশনে অব্যাহতি পাওয়া শিক্ষানবিশ এসআইরা
                </Link>

                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    নাহিদ রানাকে নিয়ে যে সতর্কবার্তা দিলেন অ্যামব্রোস
                </Link>

                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    লস অ্যাঞ্জেলেসে দাবানলের কারণ কী
                </Link>

                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    গণ-অভ্যুত্থানের ঘোষণাপত্র নিয়ে সর্বদলীয় বৈঠকে যাচ্ছে বিএনপি
                </Link>

                <Link className='ml-10 flex items-center gap-1'>
                    <MdLabelImportant className='text-[#2AB7B1] text-xl'/>
                    যে ৭টি কারণে স্নেক প্ল্যান্ট রাখতে পারেন আপনার ঘর কিংবা বাগানে
                </Link>
            </Marquee>
        </div>
    );
};

export default Latest;
