import React, { useState, Fragment } from 'react';
import { Parallax } from 'react-parallax';
import { useQuery } from "@tanstack/react-query";
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiousSecure';
import { Dialog, Transition } from '@headlessui/react';

const Profile = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedImage, setUpdatedImage] = useState('');

  // Destructure `refetch` from useQuery
  const { data: fetchedUser = {}, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email, localStorage.getItem("authToken")],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center my-4 md:my-6">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: updatedName || fetchedUser?.name,
      image: updatedImage || fetchedUser?.image,  // Properly set the image URL
    };

    try {
      const response = await axiosSecure.put(`/users/${user?.email}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully');
        setIsModalOpen(false);

        // Refetch the user data after the profile is updated
        refetch();
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Detail info banner */}
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co/SfRz7q8/loginbg.jpg"
        bgImageAlt="background image"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left"></div>
        </div>
      </Parallax>

      {/* Details card */}
      <div className="absolute top-[8rem] md:top-[12rem] left-[50%] transform -translate-x-1/2 bg-white bg-opacity-40 p-8 rounded-lg shadow-xl w-[40%] text-center backdrop-blur-md">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
          <img
            alt={fetchedUser?.name || user.name}
            src={fetchedUser?.image || "https://via.placeholder.com/150"} // Use the updated image URL from `fetchedUser`
            className="w-full h-full rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          {fetchedUser?.name || user.name}
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mb-4">{fetchedUser?.email || user.email}</p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            className="btn border-none bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
          <button
            className="btn md:px-10 bg-green-500 hover:bg-green-600 border-none text-white"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Modal for updating profile */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-opacity-70 bg-[#037269] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    Update Profile
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Enter new name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="w-full p-2 border text-white border-[#FF6F61] bg-[#02332f] opacity-60 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Image URL</label>
                      <input
                        type="text"
                        placeholder="Enter new image URL"
                        value={updatedImage}
                        onChange={(e) => setUpdatedImage(e.target.value)}
                        className="w-full p-2 border text-white border-[#FF6F61] bg-[#02332f] opacity-60 rounded"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-[#FF6F61] btn border-none md:px-8 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-[#1e9004] btn border-none md:px-8 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Profile;
