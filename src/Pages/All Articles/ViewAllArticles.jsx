import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ViewAllArticles = () => {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['approvedArticles'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/articles-req`); // Use environment variable for API URL
      return data;
    },
  });

  // Filter the articles to show only those with status 'Approved'
  const approvedArticles = articles.filter((article) => article.status === 'Approved');

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
      <div className="max-w-screen-xl mx-5 md:mx-auto ">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-8">Approved Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedArticles.map((article) => (
            <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={article.photoURL}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-2">By: {article.authorName}</p>
                <p className="text-gray-500 mb-4">{article.description}</p>
                <p className="text-sm text-gray-400">Published on: {article.postedDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllArticles;
