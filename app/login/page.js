"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [session, router]);

  return (
    <div className="container w-[90%] lg:w-[85%] flex flex-col lg:flex-row items-center gap-10 lg:gap-30 mx-auto mt-16 lg:my-20 px-2 lg:px-10 py-4 lg:py-10 text-white">
      {/* Left Section */}
      <div className="left-item w-full lg:w-1/2 flex flex-col gap-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-4 lg:p-8 shadow-xl">
        <Link href="/">
          <h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left">
            <span className="bg-gradient-to-t from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              SmartStep
            </span>
          </h1>
        </Link>
        <div>
          <h2 className="text-xl lg:text-3xl font-bold text-center lg:text-left">
            Welcome back
          </h2>
          <p className="text-sm lg:text-lg text-gray-400 text-center lg:text-left">
            Start learning with one click. Don't have an account?{" "}
            <Link href="/signup">
              <span className="text-blue-600">Sign up</span>.
            </Link>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="w-full lg:w-1/2">
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
          <div className="w-full lg:w-1/2">
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
        <div className="flex gap-2 items-center mt-1 lg:mt-4 px-2 lg:px-0">
          <div className="bg-gray-600 h-[1px] w-[40%]"></div>
          <div className="text-gray-400 w-[5%] text-center">or</div>
          <div className="bg-gray-600 h-[1px] w-[40%]"></div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={() => signIn("google")}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-white/10 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span className="text-gray-300">Sign in with Google</span>
          </button>
          <button
            onClick={() => signIn("github")}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-white/10 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub Logo"
              className="w-5 h-5"
            />
            <span className="text-gray-300">Sign in with GitHub</span>
          </button>
          <button className="bg-gradient-to-r w-full from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Log In to your account
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-full lg:w-1/2">
        <img
          src="/login.svg"
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
