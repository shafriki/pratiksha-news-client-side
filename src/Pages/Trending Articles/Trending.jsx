import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { IoNewspaperSharp } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaPenAlt } from "react-icons/fa";
import { HiMiniEye } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const Trending = () => {
    const { data: trendingArticles = [], isLoading, error } = useQuery({
        queryKey: ['trending-articles'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/trending-articles`);
            return data;
        }
    });

    const limitTitleWords = (title) => {
        const words = title.split(' ');
        if (words.length > 4) {
            return words.slice(0, 4).join(' ') + '...';
        }
        return title;
    };

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center my-10 md:my-20">
                <p className="text-red-500">There was an error fetching the data!</p>
            </div>
        );
    }

    return (
        <div 
            className="my-10 bg-fixed py-10 relative bg-cover bg-center bg-no-repeat px-5" 
            style={{ backgroundImage: "url('https://i.ibb.co.com/SfRz7q8/loginbg.jpg')" }}
        >
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                {/* Optional overlay text */}
            </div>

            <div className="relative z-10">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-white">Trending Articles</h2>
                <div className='max-w-screen-xl mx-auto'>
                    <Swiper
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 15 },
                            480: { slidesPerView: 2, spaceBetween: 15 },
                            768: { slidesPerView: 3, spaceBetween: 25 },
                            1024: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay, FreeMode]}
                        autoplay={{
                            delay: 1600,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper"
                    >
                        {trendingArticles.map((article) => (
                            <SwiperSlide key={article._id} className="relative">
                                <div className="card cursor-pointer group text-white bg-gray-500 opacity-80 shadow-xl">
                                    <figure>
                                        <img
                                            src={article.photoURL}
                                            alt="article photoURL" className='w-full h-[12rem] group-hover:scale-110 transition' />
                                    </figure>
                                    <div className="py-4 px-3">
                                        <h2 className="text-base font-bold mb-4">
                                            {limitTitleWords(article.title)}
                                        </h2>
                                        <div className="divider divider-info"></div>
                                        <p className='text-base text-white mb-1'><IoNewspaperSharp className='inline-block mr-1'  />
                                        Publisher: {article.publisher} </p>
                                        <p className='text-base text-white'><BsFillCalendarDateFill className='inline-block mr-1'  />
                                        Post Date: {article.postedDate} </p>
                                        <div className='flex items-center gap-5 my-1'>
                                        <p className='text-base text-text-white'><FaPenAlt className='inline-block mr-1'  />
                                        Reporter: {article.authorName} </p>
                                        <img src={article.authorPhotoURL} alt="reporter" className='rounded-full w-7 h-7 group-hover:scale-110 transition' /> 
                                        </div>

                                        <p className='text-base text-gray-500 mb-4'><HiMiniEye className='inline-block mr-1' />
                                        Views: {article.viewCount} </p>
                                        
                                        <div className="card-actions justify-end">
                                            
                                            <Link to={`/articles-details/${article._id}`} className="btn bg-[#02faee] hover:bg-[#01a69e] border-none text-gray-700 w-full">See More</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Trending;
