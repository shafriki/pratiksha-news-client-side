import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import useAuth from "../../Hooks/useAuth";
import { Parallax } from 'react-parallax';

const UpdateArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch article data with Authorization header
  const { data: articleData, isLoading, refetch } = useQuery({
    queryKey: ['article-details', id],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      const { data } = await axiosSecure.get(`/articles-req/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      // Pre-fill the form fields with the existing data
      setValue('title', data.title);
      setValue('content', data.description); // Use the description field from MongoDB
      setValue('image', data.photoURL); // Use the photoURL field from MongoDB
    }
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const updatedArticleData = {
      ...data,
      authorName: user?.displayName,
      authorEmail: user?.email,
      status: articleData.status,  // Assuming status remains unchanged
      postedDate: articleData.postedDate, // Keep the original postedDate if necessary
      views: articleData.views, // Keep the original view count if needed
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosSecure.put(`/articles-req/update/${id}`, updatedArticleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Article Updated`,
          showConfirmButton: false,
          timer: 1500
        });
        refetch();
        navigate('/my-articles');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center my-10 md:my-20">
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  return (
    <div>
      <Helmet>
        <title>Pratiksha News - Update Article</title>
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
              Add New Articles Here
            </h1>
          </div>
        </div>
      </Parallax>

      <div className="p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                {...register('title', { required: true })}
                defaultValue={articleData.title}
                placeholder="Enter article title"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Image URL</label>
              <input
                type="text"
                {...register('image', { required: true })}
                defaultValue={articleData.photoURL}
                placeholder="Enter image URL"
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-2">Author Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Author Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              {...register('content', { required: true })}
              defaultValue={articleData.description}
              placeholder="Enter article content"
              className="w-full border border-gray-300 p-2 rounded"
              rows="5"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Posted Date</label>
            <input
              type="date"
              value={articleData.postedDate}
              readOnly
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full btn border-none bg-[#2fc4bd] text-white py-2 px-4 rounded hover:bg-[#1c7975] transition"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
