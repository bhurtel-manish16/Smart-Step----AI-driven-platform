import React from "react";
import Image from "next/image";
import SideBar from "@/component/SideBar";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="mt-20 flex-1 px-4 py-6 lg:px-10 lg:py-10">
        <h2 className="text-xl lg:text-2xl font-bold text-white text-center lg:text-left">
          What do you want to learn?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 cursor-pointer">
          {/* Card 1: Ask AI */}
          <Link href="/askai">
            <div className="bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <Image
                src="/AI.svg"
                alt="AI Image"
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="px-4 py-2">
                <h3 className="text-lg lg:text-xl font-semibold text-white">
                  Ask AI
                </h3>
                <p className="text-sm lg:text-base text-gray-400">
                  Ask AI to assist you in learning your new interest!
                </p>
              </div>
            </div>
          </Link>

          {/* Card 2: Coming Soon */}
          <div className="bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden p-4">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400">
              Coming soon
            </h3>
          </div>

          {/* Card 3: Coming Soon */}
          <div className="bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden p-4">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-400">
              Coming soon
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;