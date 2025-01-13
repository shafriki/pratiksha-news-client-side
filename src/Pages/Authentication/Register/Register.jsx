import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdAddAPhoto, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css"; 
import useAuth from "../../../Hooks/useAuth";
import { imageUpload, saveUser } from "../../../api/utils";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    AOS.init(); 
  }, []);

   // form submit handler
   const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    console.log({ name, email, password, image });

    // 1. Send image data to imgbb or use a default image
    const photoURL = image ? await imageUpload(image) : 'https://example.com/default-avatar.jpg';

    try {
        // 2. User Registration
        const result = await createUser(email, password);

        // 3. Save username & profile photo
        await updateUserProfile(name, photoURL);
        console.log(result);

        // Save user info in DB if the user is new
        await saveUser({ ...result?.user, displayName: name, photoURL });
        navigate('/');
        toast.success('Signup Successful');
    } catch (err) {
        console.log(err);
        toast.error(err?.message);
    }
};


  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await signInWithGoogle()
      await saveUser(data?.user)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div
      className="relative bg-fixed min-h-screen bg-cover bg-center overflow-auto flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/wdM0rhy/newspapers-444453-1280.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      {/* Register form */}
      <div
        className="w-full max-w-xl mx-3 md:mx-0 mt-14 p-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-md shadow-lg z-10"
        data-aos="fade-up" 
        data-aos-duration="1000" 
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create an Account
        </h2>
        <p className="text-white text-center text-xs md:text-sm">
          Join us in making a difference!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <FaUserCircle className="ml-3 text-gray-600 text-2xl" />
            </span>
            <input
              type="text"
              name="name"
              id="name"
              className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
              placeholder="Enter Your Name"
              required
              autoComplete="name"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <MdEmail className="ml-3 text-gray-600 text-2xl" />
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="block text-sm w-full py-3 text-gray-700 bg-white border rounded-lg px-11"
              placeholder="Enter Your Email"
              required
              autoComplete="email"
            />
          </div>

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

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <RiLockPasswordFill className="ml-3 text-gray-600 text-2xl" />
            </span>
            <span className="absolute top-4 right-4 cursor-pointer" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEye className="text-gray-700" /> : <FaEyeSlash className="text-gray-700" />}
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className="block text-sm w-full px-10 py-3 text-gray-700 bg-white border rounded-lg"
              placeholder="Enter New Password"
              required
              autoComplete="new-password"
            />
          </div>

          <button className="w-full px-4 py-2 font-semibold text-white bg-[#2AB7B1] hover:bg-[#1c7975] ease-in-out btn border-none rounded-md">
            Register
          </button>
        </form>

        <div className="flex items-center justify-center px-1 mt-2 pb-3">
          <div className="flex-grow border-t border-gray-400"></div>
          <div className="mx-4 text-gray-500">Or</div>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button onClick={handleGoogleSignIn}
          type="button"
          className="w-full px-4 py-2 font-semibold text-white bg-[#0f162f] hover:bg-[#070A16] ease-in-out btn border-none rounded-md"
        >
          <FcGoogle className="text-2xl" /> Register with Google
        </button>

        <p className="text-sm text-center text-white mt-1">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
