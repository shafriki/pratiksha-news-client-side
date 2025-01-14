import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../Hooks/useAxiousSecure";

const AllPublishers = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure(); // Get the instance of axios with secure headers

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];

    // Log the form data
    console.log({ name, image });

    try {
      setLoading(true);

      // Upload image to imgBB (or other service)
      const photoURL = image ? await imageUpload(image) : "https://example.com/default-avatar.jpg";

      // Prepare the data to be sent to the backend
      const publisherData = { name, photoURL };

      // Send data to the backend using axiosSecure with the Authorization header
      const response = await axiosSecure.post('/publishers', publisherData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is included in the request
        }
      });

      // Handle the response (successful data submission)
      console.log("Publisher added successfully:", response.data);
      
    } catch (err) {
      console.error("Error adding publisher", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <h3 className="text-center text-xl md:text-3xl font-bold mb-10 md:mb-20">Add Publishers</h3>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#66c0b8] rounded-md p-4 md:p-10">
        {/* Name input */}
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <FaUserCircle className="ml-3 text-gray-600 text-2xl" />
          </span>
          <input
            type="text"
            name="name"
            id="name"
            className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
            placeholder="Enter Publisher's Name"
            required
            autoComplete="name"
          />
        </div>

        {/* Image input */}
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <MdAddAPhoto className="ml-3 text-gray-600 text-2xl" />
          </span>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
            required
            autoComplete="image"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-gray-500 hover:bg-gray-600 ease-in-out btn border-none rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Publisher"}
        </button>
      </form>
    </div>
  );
};

export default AllPublishers;
