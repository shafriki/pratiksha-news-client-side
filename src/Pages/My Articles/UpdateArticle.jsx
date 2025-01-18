import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import useAuth from "../../Hooks/useAuth";

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
            <div className="bg-purple-200 rounded-lg shadow-lg p-8 md:m-5 w-full md:w-11/12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Article</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                        <label className="label text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            defaultValue={articleData.title}
                            placeholder="Enter article title"
                            className="input input-bordered w-full rounded-md border-gray-300"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Author Name</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 rounded-md border-gray-300"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-700">Author Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 rounded-md border-gray-300"
                        />
                    </div>
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label text-gray-700">Description</label>
                        <textarea
                            {...register('content', { required: true })}
                            defaultValue={articleData.description} // Bind description
                            placeholder="Enter article content"
                            className="textarea textarea-bordered w-full rounded-md border-gray-300"
                            required
                        ></textarea>
                    </div>
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label text-gray-700">Image URL</label>
                        <input
                            type="text"
                            defaultValue={articleData.photoURL} // Bind photoURL
                            {...register('image', { required: true })}
                            placeholder="Enter image URL"
                            className="input input-bordered w-full rounded-md border-gray-300"
                            required
                        />
                    </div>
                    <div className="form-control col-span-1 md:col-span-2 mt-6">
                        <button type="submit" className="btn bg-gradient-to-r from-purple-400 to-purple-600 text-white w-full rounded-md py-2">
                            Update Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateArticle;
