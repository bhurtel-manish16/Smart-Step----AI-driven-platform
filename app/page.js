"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

const Page = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between min-h-screen px-6 md:px-16 py-12">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 mt-12 lg:mt-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            SmartStep
          </span>
        </h1>
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
          Learn to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            <Typewriter
              words={["Code", "Cook", "Write", "Draw", "and more..."]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={30}
              delaySpeed={1000}
            />
          </span>
        </div>
        <p className="text-gray-600 text-base md:text-lg max-w-md">
          Learn new skills with structured guidance and step-by-step
          instructions. Master skills faster and more effectively with us.
        </p>
        <button
          onClick={handleGetStarted}
          type="button"
          className="bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 text-white font-semibold rounded-full px-8 py-3 text-base transition duration-300 shadow-md"
        >
          Get Started
        </button>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0 hidden lg:flex">
        <Image
          src="/background-img.png"
          alt="Hero Image"
          width={480}
          height={480}
          className="rounded-xl object-contain"
        />
      </div>
    </section>
  );
};

export default Page;
