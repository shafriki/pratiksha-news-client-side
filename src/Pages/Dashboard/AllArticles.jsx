import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Function to get the first 5 words
    const getFirstFiveWords = (str) => {
        const words = str.split(' ');
        return words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');
    };

    // Fetch articles from API
    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const authToken = localStorage.getItem("authToken"); // Get the authToken from localStorage

            // Make the request with Authorization header
            const { data } = await axiosSecure('/articles-req', {
                headers: {
                    Authorization: `Bearer ${authToken}`,  // Add the token in the headers
                },
            });

            return data.map(article => ({
                ...article,
                status: article.approved ? 'Approved' : article.approved === false ? 'Rejected' : 'Pending',
            }));
        }
    });

    // Handle approve action
    const handleApproveArticle = (article) => {
        const authToken = localStorage.getItem("authToken"); // Get the authToken

        axiosSecure.patch(`/articles-req/approve/${article._id}`, {}, {
            headers: {
                Authorization: `Bearer ${authToken}`,  // Add the token in the headers
            },
        })
        .then(res => {
            refetch();
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Article Approved!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
        .catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Failed to approve article!',
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    // Handle reject action
    const handleRejectArticle = (article) => {
        const authToken = localStorage.getItem("authToken"); // Get the authToken

        axiosSecure.patch(`/articles-req/reject/${article._id}`, {}, {
            headers: {
                Authorization: `Bearer ${authToken}`,  // Add the token in the headers
            },
        })
        .then(res => {
            refetch();
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Article Rejected!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
        .catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Failed to reject article!',
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    // Pagination logic
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

    if (isLoading) {
        return (
            <div className="text-center my-10 md:my-20">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>All Articles | প্রতীক্ষা নিউজ</title>
            </Helmet>

            <h2 className="text-xl md:text-3xl text-center font-bold mb-5">All Articles</h2>
            <div className="overflow-x-auto shadow-lg">
                <table className="table">
                    <thead className="bg-[#ddf5f3]">
                        <tr>
                            <th>SL. No.</th>
                            <th>Author Name</th>
                            <th>Author Image</th>
                            <th>Title</th>
                            <th>Author Email</th>
                            <th>Posted Dated</th>
                            <th>Publisher</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentArticles.map((article, idx) => (
                            <tr key={article._id}>
                                <th>{indexOfFirstArticle + idx + 1}</th>
                                <td>{article.authorName}</td>
                                <td>
                                    <img 
                                        src={article.authorPhotoURL || 'default-image-url'} 
                                        alt="Author" 
                                        className="w-10 h-10 rounded-full" 
                                    />
                                </td>
                                <td>{getFirstFiveWords(article.title)}</td> {/* Display first 5 words of title */}
                                <td>{article.email}</td>
                                <td>{article.postedDate}</td>
                                <td>{article.publisher}</td>
                                <td className={article.status === 'Approved' ? 'text-green-600' : article.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}>
                                    {article.status}
                                </td>
                                <th>
                                    {article.status !== 'Pending' ? (
                                        <>
                                            <button disabled className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                            <button disabled className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleApproveArticle(article)} className="btn btn-xs bg-transparent text-green-600">Approve</button>
                                            <button onClick={() => handleRejectArticle(article)} className="btn btn-xs bg-transparent text-red-600">Reject</button>
                                        </>
                                    )}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <div className="text-left">
                    <p className='text-xs md:text-base text-[#52a09a] font-semibold'>
                        Showing {indexOfFirstArticle + 1} to {indexOfLastArticle > articles.length ? articles.length : indexOfLastArticle} of {articles.length} results
                    </p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-[#66c0b8]'}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-[#105852] text-white' : 'bg-white text-[#ddf5f3]'}`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-[#1d7b74]'}`}
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

export default AllArticles;
