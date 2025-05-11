import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="container w-[75%] flex items-center gap-30 mx-auto my-20 px-4 py-10 text-white">
      <div className="left-item w-1/2 ml-20 flex flex-col gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
      <Link href="/">
        <h1 className="text-3xl font bold">
          <span className="bg-gradient-to-t from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent ">
            SmartStep
          </span>{" "}
        </h1>
        </Link>
        <div>
          <h2 className="text-3xl font-bold">Start here</h2>
          <p className="text-lg text-gray-400">
            Start learning with one click. Already have an account?{" "}
           <Link href="/login"><span className="text-blue-600">Log In</span>.</Link> 
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-white/60 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div>
          <button className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Sign up to your account
          </button>
        </div>
      </div>
      <div>
        <img
          src="/login.svg" // Ensure this image has a transparent background
          alt="Hero Image"
          width={500}
          height={500}
          className="rounded-lg shadow-lg bg-transparent max-w-full h-auto object-fill"
        />
      </div>
    </div>
  );
};

export default page;
