import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaPenAlt } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { Parallax } from 'react-parallax';

const PremiumArticles = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: articles = [], isLoading, isError } = useQuery({
        queryKey: ['premiumArticles', debouncedSearchTerm],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/premium-articles`, {
                params: { searchTerm: debouncedSearchTerm },
            });
            return data;
        },
    });

    const premiumArticles = articles.filter((article) => article.status === 'Approved' && article.isPremium);

    // Truncate description if it's too long
    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(' ') + '...'
            : description;
    };

    // Loading and error states
    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center my-10 md:my-20 text-red-500">
                <p>Error fetching premium articles. Please try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Premium Articles | প্রতীক্ষা নিউজ</title>
            </Helmet>
            <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co.com/SfRz7q8/loginbg.jpg"
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
            <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
              All Articles
            </h1>
          </div>
        </div>
      </Parallax>

            {/* Premium Articles Section */}
            <div className="max-w-screen-xl mx-auto my-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {premiumArticles.map((article) => (
                        <div
                            key={article._id}
                            className="bg-[#f4f9f9]  cursor-pointer group rounded-xl shadow-lg border-y-8 border-teal-600 overflow-hidden"
                        >
                            <img
                                src={article.photoURL}
                                alt={article.title}
                                className="w-full group-hover:scale-110 transition h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>

                                {/* Publisher and Writer Info */}
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-gray-500">
                                        <span className="font-bold">
                                            <IoNewspaperSharp className="inline-block mr-1" />
                                            Publisher:
                                        </span>{' '}{article.publisher}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-bold">
                                            <FaPenAlt className="inline-block mr-1" />
                                            Writer:
                                        </span>{' '}{article.authorName}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">
                                        <SlCalender className="inline-block mr-1" />
                                        Published on:
                                    </span>{' '}{article.postedDate}
                                </p>

                                <div className="divider"></div>

                                <p className="text-gray-500 mb-4">
                                    {truncateDescription(article.description, 30)}
                                </p>

                                <Link to={`/articles-details/${article._id}`} className="btn w-full bg-[#02faee]">
                                    See More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumArticles;
