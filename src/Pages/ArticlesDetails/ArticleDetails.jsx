import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Parallax } from 'react-parallax';
import { Helmet } from 'react-helmet-async';

const ArticleDetails = () => {
  const { id } = useParams();
  const hasViewCountUpdated = useRef(false);  

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['articleDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req/${id}`);
      return data;
    },
    enabled: !!id, 
  });

  useEffect(() => {
    if (id && !hasViewCountUpdated.current) {
      axios.put(`${import.meta.env.VITE_API_URL}/articles-req/view/${id}`);
      hasViewCountUpdated.current = true;  
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center my-10 md:my-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-10 md:my-20 text-red-500">
        <p>Error fetching article details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Details | প্রতীক্ষা নিউজ</title>
      </Helmet>

      {/* parallax section */}
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={article.photoURL}
        bgImageAlt="article photourl"
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

      {/* articles details card */}
      <div className="mx-auto flex flex-col md:flex-row justify-between w-full gap-12 p-6 cursor-pointer group my-10">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-md">
              <img
                className="object-cover w-full md:h-[35rem] group-hover:scale-110 transition"
                src={article.photoURL}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1 ">
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
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
