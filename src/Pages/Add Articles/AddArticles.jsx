import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Parallax } from 'react-parallax';
import { imageUpload } from '../../api/utils';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';

const AddArticles = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishers, setPublishers] = useState([]); // State for publisher list
  const [selectedPublisher, setSelectedPublisher] = useState(null); // State for selected publisher
  const axiosSecure = useAxiosSecure();

  const tagOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Education', label: 'Education' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Politics', label: 'Politics' },
    { value: 'Business', label: 'Business' },
  ];

  // Fetch publishers from the backend
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers'); // Use your secure axios instance
        const publisherOptions = response.data.map((publisher) => ({
          value: publisher.name,
          label: publisher.name,
        }));
        setPublishers(publisherOptions);
      } catch (error) {
        console.error('Error fetching publishers:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch publishers from the server.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };
    fetchPublishers();
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const tags = selectedTags.map((tag) => tag.value); // Map selected tags to their values
    const image = form.image.files[0];

    if (!selectedPublisher) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a publisher.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      setLoading(true);

      const photoURL = image
        ? await imageUpload(image)
        : 'https://example.com/default-image.jpg';

      // Send POST request to backend
      const response = await axiosSecure.post(
        '/articles-req',
        {
          title,
          publisher: selectedPublisher.value,
          description,
          tags,
          photoURL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response?.data?.acknowledged) {
        form.reset(); // Reset form after successful submission
        setSelectedTags([]); // Reset tags
        setSelectedPublisher(null); // Reset publisher
        Swal.fire({
          title: 'Success!',
          text: 'Article added successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          position: 'center',
        });
      } else {
        console.error(
          'Error: Article addition failed',
          response?.data?.message || 'Unknown error'
        );
        Swal.fire({
          title: 'Error!',
          text: response?.data?.message || 'Unknown error occurred.',
          icon: 'error',
          confirmButtonText: 'OK',
          position: 'center',
        });
      }
    } catch (err) {
      console.error('Error adding article', err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while adding the article.',
        icon: 'error',
        confirmButtonText: 'OK',
        position: 'center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Parallax Banner */}
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage="https://i.ibb.co.com/SfRz7q8/loginbg.jpg"
        bgImageAlt="the dog"
        strength={-200}
      >
        <div className="hero-overlay h-[190px] md:h-[300px] bg-opacity-60 bg-cover bg-center bg-no-repeat text-[#02faee]">
          <div className="relative max-w-7xl mx-auto py-8 px-3 md:py-16 md:px-6 text-left">
            <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">
              Add New Articles Here
            </h1>
          </div>
        </div>
      </Parallax>

      {/* Add Article Form */}
      <div className="p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
        <form onSubmit={handleSubmit}>
          {/* Row 1: Title and Image */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Title Field */}
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Enter article title"
                required
              />
            </div>
            {/* Image Upload Field */}
            <div>
              <label className="block font-medium mb-2">Image</label>
              <input
                type="file"
                name="image"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </div>
          {/* Row 2: Publisher and Tags */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Publisher Dropdown */}
            <div>
              <label className="block font-medium mb-2">Publisher</label>
              <Select
                name="publisher"
                options={publishers}
                value={selectedPublisher}
                onChange={setSelectedPublisher} // Handle selection change
                className="basic-select"
                classNamePrefix="select"
                placeholder="Select a publisher"
              />
            </div>
            {/* Tags Multi-Select Field */}
            <div>
              <label className="block font-medium mb-2">Tags</label>
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags} // Handle selection change
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          {/* Row 3: Description */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter article description"
              rows="5"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn border-none bg-[#2fc4bd] text-white py-2 px-4 rounded hover:bg-[#1c7975] transition"
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Submit Article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticles;
