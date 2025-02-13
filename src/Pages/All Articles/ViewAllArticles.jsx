import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Parallax } from 'react-parallax';
import { FaPenAlt } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import Latest from '../Home/Latest/Latest';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Link } from 'react-router-dom';
import SubscriptionModal from '../../Components/Subscription Modal/SubscriptionModal'; 
import { Helmet } from 'react-helmet-async';
import img4 from '../../assets/akij cement.png';
import img5 from '../../assets/bike.jpg';
import img6 from '../../assets/spa.webp';
import img7 from '../../assets/bjit-limited-job-circular.webp';
import useRole from '../../hooks/useRole'; // Import useRole hook

const ViewAllArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [publishers, setPublishers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  // Get the user's role using useRole hook
  const [role, isRoleLoading] = useRole(); 

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

  // Show modal after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

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
        <p>Error fetching articles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>All Articles | প্রতীক্ষা নিউজ</title>
      </Helmet>

      {/* Parallax Section */}
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

      <Latest></Latest>

      {/* All Articles Section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 justify-between my-12 gap-5">
        {/* Left Side Section */}
        <aside className="col-span-3 mx-3 md:mt-10 md:mx-0">
          <div className="p-4 bg-gray-200 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-4">Filter Articles</h3>

            {/* Search Field */}
            <input
              type="text"
              placeholder="Search by title"
              className="input input-bordered w-full mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter by Publisher */}
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

            {/* Filter by Tag */}
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

        {/* Middle Card Section */}
        <section className="col-span-6 mx-3 md:mx-0">
          <div className="max-w-screen-xl mx-5 my-10 md:mx-auto">
            <div className="grid grid-cols-1 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article._id}
                  className={`bg-[#f4f9f9] cursor-pointer group rounded-lg shadow-lg overflow-hidden ${article.isPremium ? 'bg-amber-50 border-y-8 border-amber-500' : ''}`}
                >
                  <img
                    src={article.photoURL}
                    alt={article.title}
                    className="w-full group-hover:scale-110 transition h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>

                    {/* Writer and Publisher */}
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

                    <Link to={`/articles-details/${article._id}`}
              className={`btn w-full ${article.isPremium ? 'bg-amber-400' : 'bg-[#02faee]'}`} disabled={role === 'viewer' && article.isPremium}>
              See More
            </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side Part */}
        <aside className="col-span-3 mx-3 md:mx-0">
          <div className='mt-8'>
            <h1 className='font-semibold'>Find Us On</h1>
            <div className='flex flex-col gap-1'>
              <button className="btn rounded-none border-[#02faee] justify-start"><FaFacebook className='text-blue-600' />Facebook</button>
              <button className="btn rounded-none border-[#02faee] justify-start"><FaTwitterSquare className='text-blue-600' />Twiter</button>
              <button className="btn rounded-none border-[#02faee] justify-start"><FaInstagramSquare className='text-rose-500 bg-amber-300' />Instagram</button>
            </div>
          </div>

          <div className='mt-8 bg-[#f4f9f9] p-2'>
            <h1 className='font-semibold'>Featured Ads</h1>
            <div className='p-1 flex flex-col items-center gap-2'>
              <img src={img1} alt="add"/>
              <img src={img2} alt="add" />
              <img src={img3} alt="add" />
              <img src={img4} alt="add" />
              <img src={img5} alt="add" />
              <img src={img6} alt="add" />
              <img src={img7} alt="add" />
            </div>
          </div>
        </aside>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
    </div>
  );
};

export default ViewAllArticles;
