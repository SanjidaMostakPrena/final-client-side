import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      
      {/* Main Error Content */}
      <div className="text-center max-w-xl">
        <h1 className="text-9xl font-extrabold mb-6 animate-pulse">404</h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Go Home Button */}
        <Link
          to="/"
          className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>

      {/* Decorative Illustration */}
      <div className="mt-16">
        <svg
          className="w-80 h-80 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
        >
          <circle cx="250" cy="250" r="250" fill="#F0F0F0" />
          <path
            d="M150 320 L200 200 L250 320 L300 200 L350 320"
            stroke="#000"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="200" cy="200" r="8" fill="#000" />
          <circle cx="300" cy="200" r="8" fill="#000" />
        </svg>
      </div>

      {/* Footer Text */}
      <p className="mt-12 text-gray-500">
        © {new Date().getFullYear()} BookCourier. All rights reserved.
      </p>
    </div>
  );
};

export default ErrorPage;
