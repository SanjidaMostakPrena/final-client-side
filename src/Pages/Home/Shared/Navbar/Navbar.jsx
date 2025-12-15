import React from 'react';
import Logo from '../../../../Components/logo/logo';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth';

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch(err => console.log(err));
  };


  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'text-gray-700'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'text-gray-700'
          }
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'text-gray-700'
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-primary font-bold' : 'text-gray-700'
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  
  if (loading) {
    return (
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
    
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-3">
        {user && user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        )}

        {user ? (
          <>
            <NavLink to="/add-book" className="btn btn-accent text-black">
              Add Book
            </NavLink>
            <NavLink to="/dashboard" className="btn btn-primary text-black">
              Dashboard
            </NavLink>
            <button onClick={handleLogout} className="btn btn-error text-white">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-outline">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
