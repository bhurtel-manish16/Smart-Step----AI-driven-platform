"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetStarted = () => {
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-black/50 backdrop-blur-md shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        SmartStep
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex items-center space-x-8 text-gray-300 font-semibold">
        <Link href="/dashboard" className="hover:text-pink-400 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-pink-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-pink-400 transition">
          Contact
        </Link>
      </nav>

      {/* Desktop User/Login Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        {session && session.user ? (
          <div className="relative">
            <img
              src={session.user.image}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-pink-400 hover:scale-110 transition-transform cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-2 text-gray-300">
                <Link href="/profile" className="block px-4 py-2 hover:bg-white/10 transition">
                  My Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-white/10 transition">
                  Settings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-white" onClick={handleGetStarted}>
              Login
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Sign Up
            </Button>
          </>
        )}
      </div>

      {/* Mobile Profile + Hamburger */}
      <div className="lg:hidden flex items-center space-x-4">
        {session && session.user && (
          <div className="relative">
            <img
              src={session.user.image}
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-pink-400 hover:scale-110 transition-transform cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-2 text-gray-300">
                <Link href="/profile" className="block px-4 py-2 hover:bg-white/10 transition" onClick={() => setDropdownOpen(false)}>
                  My Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-white/10 transition" onClick={() => setDropdownOpen(false)}>
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/70 backdrop-blur-md flex flex-col items-center space-y-4 py-6 z-40">
          <Link href="/dashboard" className="text-lg font-semibold text-gray-300 hover:text-pink-400 transition" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/about" className="text-lg font-semibold text-gray-300 hover:text-pink-400 transition" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/contact" className="text-lg font-semibold text-gray-300 hover:text-pink-400 transition" onClick={toggleMenu}>
            Contact
          </Link>
          {!session && (
            <>
              <Button variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-500 hover:text-white" onClick={handleGetStarted}>
                Login
              </Button>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;
