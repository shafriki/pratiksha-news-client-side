import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import { FaPenAlt } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const ViewAllArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [publishers, setPublishers] = useState([]); 

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
        setPublishers(data); 
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };
    fetchPublishers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['approvedArticles', debouncedSearchTerm], 
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req`, {
        params: { searchTerm: debouncedSearchTerm }, 
      });
      return data;
    },
  });

  const approvedArticles = articles.filter((article) => article.status === 'Approved');

  const filteredArticles = approvedArticles.filter((article) => {
    const matchesPublisher = selectedPublisher ? article.publisher === selectedPublisher : true;
    const matchesTag = selectedTag ? article.tags?.includes(selectedTag) : true;
    return matchesPublisher && matchesTag;
  });

  const tags = [...new Set(approvedArticles.flatMap((article) => article.tags || []))];

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
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-4">Filter Articles</h3>

            {/* Search field */}
            <input
              type="text"
              placeholder="Search by title"
              className="input input-bordered w-full mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />

            {/* Filter by publisher */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">Publisher</label>
              <select
                className="select select-bordered w-full"
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
              >
                <option value="">All Publishers</option>
                {publishers.map((publisher) => (
                  <option key={publisher._id} value={publisher.name}>
                    {publisher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by tag */}
            <div>
              <label className="block mb-2 font-bold">Tags</label>
              <select
                className="select select-bordered w-full"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* middle card section */}
        <section className="col-span-6 mx-3 md:mx-0">
          <div className="max-w-screen-xl mx-5 my-10 md:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article._id}
                  className="bg-[#f4f9f9] cursor-pointer group rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={article.photoURL}
                    alt={article.title}
                    className="w-full group-hover:scale-110 transition h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    {/* writer and publisher */}
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

                    <button className="btn w-full bg-[#02faee]">See More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* right side part */}
        <aside className="col-span-3 mx-3 md:mx-0">
          <p>Additional content or widgets can go here.</p>
        </aside>
      </div>
    </div>
  );
};

export default ViewAllArticles;
