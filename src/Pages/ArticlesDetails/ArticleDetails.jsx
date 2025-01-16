import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Parallax } from 'react-parallax';


const ArticleDetails = () => {
  const { id } = useParams();

  // Fetch article details using React Query
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['articleDetails', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req/${id}`); // Update the endpoint here
      return data;
    },
    enabled: !!id, // Ensure the query only runs if an ID is available
  });

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
        {/* parallax section */}
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co.com/wdM0rhy/newspapers-444453-1280.jpg"
        bgImageAlt="the dog"
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

      <div className="max-w-4xl mx-auto my-10 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <img src={article.photoURL} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <div className="text-sm text-gray-500 mb-4">
        <p>
          <span className="font-bold">Publisher:</span> {article.publisher}
        </p>
        <p>
          <span className="font-bold">Author:</span> {article.authorName}
        </p>
        <p>
          <span className="font-bold">Posted On:</span> {article.postedDate}
        </p>
      </div>
      <div className="text-gray-700">
        <p>{article.description}</p>
      </div>
    </div>
    </div>
  );
};

export default ArticleDetails;
