import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../../Components/logo/logo";
import useAuth from "../../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout, loading, role } = useAuth();

  const handleLogout = () => {
    logout().catch(err => console.log(err));
  };

  if (loading) {
    return (
      <div className="navbar bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg px-4">
        <Logo />
        <p className="ml-4 text-indigo-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="navbar bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg px-4 md:px-8">
      {/* Left */}
      <div className="navbar-start">
        <Logo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 font-medium text-indigo-900">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 border-b-2 border-teal-600 transition-all"
                  : "hover:text-teal-500 transition-colors"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 border-b-2 border-teal-600 transition-all"
                  : "hover:text-teal-500 transition-colors"
              }
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/coverage"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 border-b-2 border-teal-600 transition-all"
                  : "hover:text-teal-500 transition-colors"
              }
            >
              Coverage
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 border-b-2 border-teal-600 transition-all"
                  : "hover:text-teal-500 transition-colors"
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-teal-200 shadow-sm"
          />
        )}

        {(role === "admin" || role === "librarian") && (
          <NavLink
            to={role === "librarian" ? "/dashboard/add-book" : "/add-book"}
            className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all"
          >
            Add Book
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/dashboard"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all"
          >
            Dashboard
          </NavLink>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="btn border-2 border-indigo-500 text-indigo-700 hover:bg-indigo-100 transition-all"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
