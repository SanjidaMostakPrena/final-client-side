
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../../Components/logo/logo';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-indigo-900 dark:text-gray-200 p-10 shadow-inner">

      {/* Logo & Description */}
      <aside className="flex flex-col items-center gap-4">
        <Logo />

        <p className="font-bold text-lg text-center">
          BookCourier – Library to Home Delivery
          <br />
          Delivering knowledge to your doorstep.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} BookCourier. All rights reserved.
        </p>
      </aside>

      {/* Page Links */}
      <nav className="mt-6">
        <ul className="flex flex-wrap gap-6 justify-center text-indigo-900 dark:text-gray-200">
          <li><NavLink to="/" className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Home</NavLink></li>
          <li><NavLink to="/books" className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Books</NavLink></li>
          <li><NavLink to="/coverage" className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Coverage</NavLink></li>
          <li><NavLink to="/about" className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">About Us</NavLink></li>
          <li><NavLink to="/privacy" className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">Privacy</NavLink></li>
        </ul>
      </nav>

      {/* Social Links */}
      <div className="mt-6 flex gap-6 justify-center">
        {/* X (Twitter) */}
        <a
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 1200 1227">
            <path d="M714 519l416-519h-98L657 459 427 0H0l437 729L18 1227h98l355-428 244 428h427zm-145 238L135 80h238l325 558 333-558h239z" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8H6v4h3v12h5V12h3.642l.358-4h-4V6.333c0-.955.192-1.333 1.115-1.333h2.885V0h-3.808C10.404 0 8.808 1.583 8.808 4.615V8z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
