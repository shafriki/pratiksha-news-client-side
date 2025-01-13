import React from 'react';
import { Typewriter } from 'react-simple-typewriter'; 


const TopNews = () => {
    return (
        <div 
            className="my-10 bg-fixed py-10 relative bg-cover bg-center bg-no-repeat px-5" 
            style={{ backgroundImage: "url('https://i.ibb.co.com/SfRz7q8/loginbg.jpg')" }}
        >
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                {/* Optional overlay text */}
            </div>

            {/* Content Section */}
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10  py-5">
                    <div className="w-full md:w-[30%] grid grid-cols-2 gap-1 md:gap-2">
                        <img 
                            src='https://i.ibb.co.com/r517mr3/a2.webp' 
                            alt="featured-image" 
                            className="w-full border-2 border-[#2AB7B1] h-32 md:h-48 object-cover rounded-md"
                        />
                        <img 
                            src='https://i.ibb.co.com/MgKncG2/a4.webp' 
                            alt="featured-image" 
                            className="w-full border-2 border-[#2AB7B1] h-32 md:h-48 object-cover rounded-md"
                        />
                        <img 
                            src='https://i.ibb.co.com/PFcDL3J/a3.jpg' 
                            alt="featured-image" 
                            className="w-full border-2 border-[#2AB7B1] h-32 md:h-48 object-cover rounded-md"
                        />
                        <img 
                            src='https://i.ibb.co.com/gF6KLwj/a1.webp' 
                            alt="featured-image" 
                            className="w-full border-2 border-[#2AB7B1] h-32 md:h-48 object-cover rounded-md"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-white mb-1 text-sm">প্রকাশ: ১৩ জানুয়ারি ২০২৫</p>

                        {/* Text typewriter effect */}
                        <h1 className="text-sm md:text-2xl font-bold text-[#2AB7B1] mb-1">
                            <Typewriter
                                words={["লস অ্যাঞ্জেলেসে দাবানলের কারণ কী", "যুক্তরাষ্ট্র", "লস অ্যাঞ্জেলেসের প্যালিসেইডস অঞ্চল"]}
                                loop={0} 
                                cursor
                                cursorStyle="_"
                                typeSpeed={100}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </h1>

                        <p className="w-full md:w-[25rem] lg:w-[30rem] text-justify text-white text-sm md:text-base mx-auto md:mx-0">
                        যুক্তরাষ্ট্রের লস অ্যাঞ্জেলেস কাউন্টি শেরিফ রবার্ট লুনা বলেছেন, গোয়েন্দারা (দাবানলের) সম্ভাব্য সব কারণ খতিয়ে দেখছেন। সবকিছু পুঙ্খানুপুঙ্খভাবে খতিয়ে দেখা হচ্ছে। যুক্তরাষ্ট্রের ক্যালিফোর্নিয়া অঙ্গরাজ্যের লস অ্যাঞ্জেলেসের যে কয়েকটি অঞ্চল দাবানলে জ্বলছে, সেগুলোর মধ্যে প্যালিসেইডস ও ইটন অন্যতম। যুক্তরাষ্ট্রে দাবানলের সাধারণ কারণ হিসেবে বজ্রপাতকে দায়ী করা হয়। কিন্তু এবার এ দুই অঞ্চলে বজ্রপাতের কারণে দাবানল হয়নি।
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNews;