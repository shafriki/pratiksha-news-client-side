import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MdOutlineEdit, MdDelete } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import useAuth from '../../Hooks/useAuth';
import DeleteModal from './DeleteModal';
import { Parallax } from 'react-parallax';

const MyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false); // State for reason modal
    const [rejectionReason, setRejectionReason] = useState(''); // State for storing rejection reason
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const closeModal = () => {
        setIsOpen(false);
    };

    const closeReasonModal = () => {
        setIsReasonModalOpen(false);
    };

    // Fetch articles
    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ['my-articles', user?.email],
        queryFn: async () => {
            const token = localStorage.getItem('authToken');
            const { data } = await axiosSecure.get(`/my-articles/${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        }
    });

    // Delete article
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const token = localStorage.getItem('authToken');
            const { data } = await axiosSecure.delete(`/delete-article/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Article Deleted!',
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    });

    const handleDelete = async (id) => {
        try {
            await mutateAsync(id);
        } catch (err) {
            console.error(err);
        }
    };

    const indexOfLastArticle = currentPage * itemsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewReason = (reason) => {
        setRejectionReason(reason);
        setIsReasonModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='mb-10'>
            <Helmet>
                <title>My Articles | প্রতীক্ষা নিউজ</title>
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
                          My All Articles Here
                        </h1>
                      </div>
                    </div>
                  </Parallax>

            <h2 className="text-xl md:text-3xl text-center font-bold my-10">My Articles</h2>
            {articles.length === 0 && <p className="text-center text-lg">You have not added any articles.</p>}
            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    <thead className="bg-[#ddf5f3]">
                        <tr>
                            <th>SL.No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Posted Date</th>
                            <th>Actions</th>
                            <th>Reason</th> {/* New column for Reason */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.map((article, idx) => (
                            <tr key={article._id}>
                                <td>{indexOfFirstArticle + idx + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={article.photoURL} alt="Article" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{article.title.split(' ').slice(0, 4).join(' ')}{article.title.split(' ').length > 4 ? '...' : ''}</td>
                                <td>{article.status ? article.status : 'Pending'}</td>

                                <td>{article.postedDate}</td>
                                <td>
                                    <Link to={`details/${article._id}`}>
                                        <button className="btn btn-xs bg-transparent text-blue-600">
                                            <CiCircleMore className='hidden md:block'/> View
                                        </button>
                                    </Link>
                                    <Link to={`/my-articles/update/${article._id}`}>
    <button className="btn btn-xs bg-transparent text-green-600">
        <MdOutlineEdit className='hidden md:block'/> Edit
    </button>
</Link>

                                    <button
                                        onClick={() => {
                                            setIsOpen(true);
                                            setSelectedId(article._id);
                                        }}
                                        className="btn btn-xs bg-transparent text-red-600"
                                    >
                                        <MdDelete className='hidden md:block'/> Delete
                                    </button>
                                </td>
                                <td>
                                    {article.status === 'Rejected' && (
                                        <button
                                            onClick={() => handleViewReason(article.rejectReason)}
                                            className="btn btn-xs bg-transparent text-orange-600"
                                        >
                                            View Reason
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteModal handleDelete={handleDelete} id={selectedId} isOpen={isOpen} closeModal={closeModal} />

            {/* Rejection Reason Modal */}
            {isReasonModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Rejection Reason</h3>
                        <p className="text-gray-700">{rejectionReason}</p>
                        <button
                            onClick={closeReasonModal}
                            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p className="text-teal-600 font-semibold">
                        Showing {indexOfFirstArticle + 1} to {indexOfLastArticle > articles.length ? articles.length : indexOfLastArticle} of {articles.length} results
                    </p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-teal-500'}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'}`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-purple-500'}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyArticles;
