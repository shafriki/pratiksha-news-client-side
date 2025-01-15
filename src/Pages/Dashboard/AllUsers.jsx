import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiousSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch users with authorization header
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users", localStorage.getItem("authToken")], // Include token in the query key for dynamic refetch
        queryFn: async () => {
            const { data } = await axiosSecure.get("/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Secure API requests
                },
            });
            return data;
        },
    });

    // Make Admin handler
    // PATCH Request to promote user to admin
const handleMakeAdmin = (user) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to undo this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#a38bbf",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure
                .patch(`/users/admin/${user._id}`, { role: "admin" }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
                .then((res) => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${user.name} is now an admin!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch(); // Refresh the users list
                    } else {
                        Swal.fire("Error", "Failed to make the user an admin.", "error");
                    }
                })
                .catch((err) => {
                    Swal.fire("Error", err.message, "error");
                });
        }
    });
};


    // Pagination logic
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / itemsPerPage);
    const currentUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Pagination controls
    const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <div className="text-center my-4 md:my-6">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl md:text-3xl text-center font-bold mb-5">Manage All Users</h2>
            <div className="overflow-x-auto shadow-md">
                <table className="table">
                    <thead className="bg-[#ddf5f3]">
                        <tr>
                            <th>#</th>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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
                                <td>
                                    {user.role === "admin" ? (
                                        <button disabled className="border rounded-lg px-2 py-[2px] text-green-600 text-xs">
                                            Admin
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-xs bg-transparent text-red-600"
                                            onClick={() => handleMakeAdmin(user)}
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-8 space-y-2">
                <p className="text-xs md:text-base text-[#52a09a] font-semibold">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} results
                </p>
                <div className="flex space-x-2">
                    <button
                        className={`px-3 py-1 border rounded ${
                            currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-[#66c0b8]"
                        }`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded ${
                                currentPage === index + 1 ? "bg-[#105852] text-white" : "bg-white text-[#ddf5f3]"
                            }`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 border rounded ${
                            currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-[#1d7b74]"
                        }`}
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

export default AllUsers;
