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
      <div className="navbar bg-base-100 shadow px-4">
        <Logo />
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow px-4 md:px-8">
      {/* Left */}
      <div className="navbar-start">
        <Logo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/books">Books</NavLink></li>
          <li><NavLink to="/coverage">Coverage</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
        )}

        {(role === "admin" || role === "librarian") && (
          <NavLink
            to={role === "librarian" ? "/dashboard/add-book" : "/add-book"}
            className="btn btn-accent text-black"
          >
            Add Book
          </NavLink>
        )}

        {user && (
          <NavLink to="/dashboard" className="btn btn-primary text-black">
            Dashboard
          </NavLink>
        )}

        {user ? (
          <button onClick={handleLogout} className="btn btn-error text-white">
            Logout
          </button>
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
