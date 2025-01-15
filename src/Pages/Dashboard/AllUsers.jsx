import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiousSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure("/users");
            return data;
        },
    });

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a38bbf",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `This Users is admin now`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / itemsPerPage);

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
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2 className="text-xl md:text-3xl text-center font-bold mb-5">Manage All Users</h2>

                <div className="overflow-x-auto shadow-md">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#ddf5f3]">
                            <tr>
                                <th></th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, idx) => (
                                <tr key={user._id}>
                                    <th>{indexOfFirstUser + idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="User Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <th>
                                        {user.role === 'admin' ? (
                                            <button disabled className="border rounded-lg px-2 py-[2px] text-green-600 disabled text-xs">Admin</button>
                                        ) : (
                                            <button
                                                className="btn btn-xs bg-transparent text-red-600"
                                                onClick={() => handleMakeAdmin(user)}
                                            >
                                                Make Admin
                                            </button>
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
                            Showing {indexOfFirstUser + 1} to {indexOfLastUser > users.length ? users.length : indexOfLastUser} of {users.length} results
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
        </div>
    );
};

export default AllUsers;
