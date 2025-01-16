import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import { FaPenAlt } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const ViewAllArticles = () => {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['approvedArticles'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req`);
      return data;
    },
  });

  // Filter the articles to show only those with status 'Approved'
  const approvedArticles = articles.filter((article) => article.status === 'Approved');

  // Helper function to truncate description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : description;
  };

  if (isLoading) {
    return (
      <div className="text-center my-10 md:my-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-10 md:my-20 text-red-500">
        <p>Error fetching articles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* parallax section */}
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

      {/* all articles section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 justify-between my-12 gap-5">
        {/* left side section */}
        <aside className="col-span-3 mx-3 md:mx-0">
          <p>left side part</p>
        </aside>

        {/* middle card section */}
        <section className="col-span-6 mx-3 md:mx-0">
          <div className="max-w-screen-xl mx-5 my-10 md:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {approvedArticles.map((article) => (
                <div key={article._id} className="bg-[#f4f9f9] cursor-pointer group rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={article.photoURL}
                    alt={article.title}
                    className="w-full  group-hover:scale-110 
                transition h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    {/* writer and publisher */}
                    <div className='flex items-center justify-between mb-1'>
                    <p className="text-sm text-gray-500 "><span className='font-bold'><IoNewspaperSharp className='inline-block mr-1' />
                    Publisher:</span> {article.publisher}</p>

                    <p className="text-sm text-gray-500 "><span className='font-bold'><FaPenAlt className='inline-block mr-1'/>Writer:</span> {article.authorName}</p>

                        
                    </div>

                    <p className="text-sm text-gray-500"><span className='font-bold'><SlCalender className='inline-block mr-1'/>
                    Published on:</span> {article.postedDate}</p>

                    <div class="divider"></div>

                    <p className="text-gray-500 mb-4">
                      {truncateDescription(article.description, 30)}
                    </p>

                    <button className='btn w-full bg-[#02faee]'>See More</button>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* right card section */}
        <aside className="col-span-3 mx-3 md:mx-0">
          <p>right side part</p>
        </aside>
      </div>
    </div>
  );
};

export default ViewAllArticles;
