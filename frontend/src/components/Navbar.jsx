import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <header className="bg-zinc-900 p-5 mb-4 rounded-2xl sticky top-0">
      <div className="flex text-white">
        <a href="/">
          <h1 className="my-auto font-bold text-[22px] lg:text-3xl  pr-2 mr-2 border-r-2 border-green-500 lg:pr-5 lg:mr-5">
            Student Management
          </h1>
        </a>
        <span className="my-auto mr-2 lg:hidden" onClick={() => setNav(!nav)}>
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </span>
        <div className="my-auto">
          <ul className="hidden lg:flex font-bold">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff", // Active green color
                textDecoration: "none",
              })}
            >
              <li className="mr-10 p-1 border-b-2 border-transparent hover:border-b-green-300 transition-all duration-300 ease-linear">
                Home
              </li>
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mr-10 p-1 border-b-2 border-transparent hover:border-b-green-300 transition-all duration-300 ease-linear">
                About
              </li>
            </NavLink>
            <NavLink
              to="/portfolio"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mr-10 p-1 border-b-2 border-transparent hover:border-b-green-300 transition-all duration-300 ease-linear">
                Portfolio
              </li>
            </NavLink>
            <NavLink
              to="/feedback"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mr-10 p-1 border-b-2 border-transparent hover:border-b-green-300 transition-all duration-300 ease-linear">
                Feedback
              </li>
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mr-10 p-1 border-b-2 border-transparent hover:border-b-green-300 transition-all duration-300 ease-linear">
                Contact
              </li>
            </NavLink>
          </ul>
        </div>
        <a
          href="https://github.com/PugazhendhiDev/"
          className="my-auto ml-auto flex rounded text-white font-bold bg-zinc-600 border-2 border-green-500 p-1 lg:px-5 lg:py-2"
        >
          <h1 className="hidden uppercase lg:block">Logout</h1>
        </a>
      </div>
      {nav && (
        <div
          id="menu"
          className="mt-5 p-5 bg-zinc-800 "
          onClick={() => setNav(!nav)}
        >
          <ul className="font-bold text-white">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mb-2 hover:text-green-500 border-b border-teal-700">Home</li>
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mb-2 hover:text-green-500 border-b border-teal-700">About</li>
            </NavLink>
            <NavLink
              to="/portfolio"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mb-2 hover:text-green-500 border-b border-teal-700">Portfolio</li>
            </NavLink>
            <NavLink
              to="/feedback"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="mb-2 hover:text-green-500 border-b border-teal-700">Feedback</li>
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "rgb(0, 255, 0)" : "#fff",
                textDecoration: "none",
              })}
            >
              <li className="hover:text-green-500 border-b border-teal-700">Contact</li>
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;



{/* <button
          className="text-gray-300 hover:text-white transition duration-300 ease-in-out"
          onClick={toggleNavbar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}