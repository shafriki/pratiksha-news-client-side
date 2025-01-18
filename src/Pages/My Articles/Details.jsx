import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import { Parallax } from 'react-parallax';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const Details = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axiosSecure.get(`/articles-req/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArticle(data); // Set the article data
            } catch (err) {
                console.error('Error fetching article:', err);
            }
        };

        fetchArticle();
    }, [id, axiosSecure]);

    if (!article) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Details | প্রতীক্ষা নিউজ</title>
            </Helmet>

            {/* Parallax section */}
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={article.photoURL}
                bgImageAlt="Background"
                strength={-200}
            >
                <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
                    <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
                        <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-24 text-center">
                            {article.title}
                        </h1>
                    </div>
                </div>
            </Parallax>

            {/* Article details card */}
            <div className="mx-auto flex flex-col md:flex-row justify-between w-full gap-12 p-6 cursor-pointer group my-10">
                {/* Header */}
                <div className="flex flex-col gap-6 flex-1">
                    <div>
                        <div className="w-full overflow-hidden rounded-md">
                            <img
                                className="object-cover w-full h-[35rem] group-hover:scale-110 transition"
                                src={article.photoURL}
                                alt="header image"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:gap-10 flex-1">
                    {/* Article Info */}
                    <h2 className="text-3xl font-bold text-gray-800">{article.title}</h2>
                    <hr className="my-6" />
                    <div className="text-xs md:text-lg font-light text-justify text-neutral-500">
                        {article.description}
                    </div>
                    <hr className="my-6" />
                    <div className="text-lg text-neutral-900 font-light flex flex-row items-center gap-2">
                        <div><span className='font-semibold'>Reporter:</span> {article.authorName}</div>
                        <img
                            className="rounded-full w-10 h-10"
                            alt="Avatar"
                            referrerPolicy="no-referrer"
                            src={article.authorPhotoURL}
                        />
                    </div>
                    <hr className="my-6" />
                    <div>
                        <p className="gap-4 font-light text-neutral-500">
                            <span className='font-semibold'>Publisher:</span> {article.publisher}
                        </p>
                        <p className="gap-4 font-light text-neutral-500">
                            <span className='font-semibold'>Posted Date:</span> {article.postedDate}
                        </p>
                        <p className="gap-4 font-light text-neutral-500">
                            <span className='font-semibold'>Views:</span> {article.viewCount}
                        </p>
                    </div>
                    <hr className="my-6" />
                    <Link to='/my-articles' className='btn border-none bg-teal-400 hover:bg-teal-500'>Back To My Article</Link>

                </div>
            </div>
        </div>
    );
};

export default Details;
