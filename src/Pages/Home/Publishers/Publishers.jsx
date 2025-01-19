import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Publishers = () => {
    const { data: publishers = [], isLoading } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-screen-xl mx-5 md:mx-auto my-16">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">All Publishers</h2>
            <Swiper
    breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 15 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        768: { slidesPerView: 3, spaceBetween: 25 },
        1024: { slidesPerView: 4, spaceBetween: 30 }, // Add this line for 4 slides per view on larger screens
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
    {publishers.map((publisher) => (
        <SwiperSlide key={publisher._id} className="relative">
            <div className="bg-white cursor-pointer group rounded-lg shadow-lg overflow-hidden">
                <img
                    src={publisher.photoURL}
                    alt={publisher.name}
                    className="w-full group-hover:scale-110 h-64 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-sm md:text-lg uppercase text-center absolute bottom-0 left-0 right-0 flex items-center justify-center text-semibold text-black bg-opacity-60 bg-[#2AB7B1] py-2">{publisher.name}</h3>
                </div>
            </div>
        </SwiperSlide>
    ))}
</Swiper>

        </div>
        </div>
    );
};

export default Publishers;
