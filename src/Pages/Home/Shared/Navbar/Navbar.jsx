
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../../Components/logo/logo";
import useAuth from "../../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout, loading, role } = useAuth();
  const [theme, setTheme] = useState("light");

  const handleLogout = () => logout().catch(console.log);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === "light" ? "dark" : "light"));

  if (loading) {
    return (
      <div className="navbar bg-gradient-to-r from-indigo-300 to-teal-500 px-4">
        <Logo />
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="navbar bg-gradient-to-r from-indigo-50 to-teal-500 shadow-lg px-4 md:px-8">

      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-60 space-y-1"
          >
            {/* NAV LINKS */}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>

            <div className="divider my-1"></div>

            {/* THEME */}
            <li>
              <button onClick={toggleTheme}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </li>

            {(role === "admin" || role === "librarian") && (
              <li>
                <NavLink to={role === "librarian" ? "/dashboard/add-book" : "/add-book"}>
                  Add Book
                </NavLink>
              </li>
            )}

            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}

            {user ? (
              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>

        <Logo />
      </div>

      {/* CENTER (DESKTOP) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 font-medium text-indigo-900">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/books">Books</NavLink></li>
          <li><NavLink to="/coverage">Coverage</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
        </ul>
      </div>

      {/* RIGHT (DESKTOP ONLY) */}
      <div className="navbar-end hidden lg:flex items-center gap-3">

        {/* THEME TOGGLE */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <svg className="swap-on w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M5.64 17.36L4.22 18.78l1.42 1.42 1.42-1.42zM12 6a6 6 0 100 12 6 6 0 000-12z" />
          </svg>
          <svg className="swap-off w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0012 21z" />
          </svg>
        </label>

        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-teal-200"
          />
        )}

        {(role === "admin" || role === "librarian") && (
          <NavLink
            to={role === "librarian" ? "/dashboard/add-book" : "/add-book"}
            className="btn bg-teal-500 hover:bg-teal-600 text-white"
          >
            Add Book
          </NavLink>
        )}

        {user && (
          <NavLink
            to="/dashboard"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Dashboard
          </NavLink>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn border-2 border-indigo-500 text-indigo-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
