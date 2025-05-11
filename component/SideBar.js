"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-16 lg:top-0 left-0 z-40 h-[calc(100%-4rem)] lg:h-auto bg-gradient-to-b from-purple-800 to-indigo-800 p-6 flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 lg:w-60 rounded-none lg:rounded-r-3xl shadow-2xl`}
        role="navigation"
      >
        <div className="flex flex-col">
          
          <nav className="mt-20">
            <ul className="space-y-6">
              {[
                "Explore AI Topics",
                "Active Courses",
                "Progress Tracker",
                "Wishlist",
                "AI Tools & Resources",
                "Community Discussions",
              ].map((item, index) => (
                <li
                  key={index}
                  tabIndex="0"
                  className="text-lg text-gray-300 hover:text-white hover:scale-105 focus:text-white focus:scale-105 transition-all duration-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 text-sm text-gray-400 hidden lg:block">
          © 2025 The Bhurtel
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default SideBar;
