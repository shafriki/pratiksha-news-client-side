import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { imageUpload } from "../../api/utils";
import useAxiosSecure from "../../Hooks/useAxiousSecure";

const AllPublishers = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();  // Use axiosSecure from your custom hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];

    try {
      setLoading(true);

      // Upload image and get photo URL
      const photoURL = image ? await imageUpload(image) : "https://example.com/default-avatar.jpg";

      // Send POST request to backend
      const response = await axiosSecure.post(
        "/publishers", 
        { name, photoURL }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,  // Attach the token if necessary
          },
        }
      );

      // Check if the response indicates success
      if (response?.data?.success) {  // Check if 'success' is true in the response
        console.log("Publisher added successfully:", response.data);
        form.reset();  // Reset form after successful submission
      } else {
        console.error("Error: Publisher addition failed", response?.data?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error adding publisher", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <h3 className="text-center text-xl md:text-3xl font-bold mb-10">Add Publisher</h3>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#66c0b8] rounded-md p-6">
        {/* Name Input */}
        <div className="relative">
          <FaUserCircle className="absolute left-3 top-3 text-gray-600 text-2xl" />
          <input
            type="text"
            name="name"
            className="w-full py-3 pl-10 pr-3 text-sm border rounded-lg"
            placeholder="Enter Publisher's Name"
            required
          />
        </div>

        {/* Image Input */}
        <div className="relative">
          <MdAddAPhoto className="absolute left-3 top-3 text-gray-600 text-2xl" />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full py-3 pl-10 pr-3 text-sm border rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Publisher"}
        </button>
      </form>
    </div>
  );
};

export default AllPublishers;
