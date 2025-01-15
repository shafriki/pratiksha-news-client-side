import React, { useState } from 'react';
import Select from 'react-select';
import { Parallax } from 'react-parallax';

const AddArticles = () => {

    const tagOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Education', label: 'Education' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Politics', label: 'Politics' },
        { value: 'Business', label: 'Business' },
    ];



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
                        <h1 className="font-bold text-lg md:text-4xl mt-20 md:mt-16 text-center">Add New Articles Here</h1>
                    </div>
                </div>
            </Parallax>

            {/* Add Article Form */}
            <div className="p-10 rounded-md bg-gray-200 max-w-screen-lg mx-auto shadow my-8">
                <form >
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
                        {/* Publisher Field */}
                        <div>
                            <label className="block font-medium mb-2">Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                               
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Enter publisher name"
                                required
                            />
                        </div>
                        {/* Tags Multi-Select Field */}
                        <div>
                            <label className="block font-medium mb-2">Tags</label>
                            <Select
                                isMulti
                                name="tags"
                                options={tagOptions}
                                
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
                    >
                        Submit Article
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddArticles;
