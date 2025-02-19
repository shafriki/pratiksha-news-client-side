import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Parallax } from 'react-parallax';

const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <title>Contact Us | প্রতীক্ষা নিউজ</title>
            </Helmet>

            {/* Parallax Hero Section */}
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage="https://i.ibb.co.com/SfRz7q8/loginbg.jpg"
                bgImageAlt="Contact Us Banner"
                strength={-200}
            >
                <div className="hero-overlay h-[250px] md:h-[350px] bg-opacity-60 flex items-center justify-center text-[#02faee]">
                    <h1 className="font-extrabold text-3xl md:text-5xl text-center drop-shadow-lg">Contact Us</h1>
                </div>
            </Parallax>

            {/* Contact Info Section */}
            <div className="max-w-6xl mx-auto p-6 md:p-12 text-gray-800">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Get in Touch</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Email", info: "support@pratikshanews.com" },
                        { title: "Phone", info: "+880 1234 567 890" },
                        { title: "Address", info: "Uttara, Dhaka, Bangladesh" }
                    ].map((item, index) => (
                        <div key={index} className="text-center p-6 border rounded-lg shadow-md bg-[#e3f8f7] hover:shadow-lg transition">
                            <h3 className="font-semibold text-xl text-[#043734] mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-lg">{item.info}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
