import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data?.role || "user"))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content bg-gradient-to-b from-indigo-50 via-white to-teal-50 min-h-screen p-4">
        <nav className="navbar bg-white shadow-md rounded-xl mb-6 px-4 py-2 flex items-center justify-between">
          <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <h2 className="font-bold text-xl text-indigo-900">
            {role === "admin" && "Admin Panel"}
            {role === "librarian" && "Librarian Panel"}
            {role === "user" && "User Panel"}
          </h2>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-teal-200 shadow-sm"
            />
          )}
        </nav>

        <div className="p-2 rounded-xl bg-indigo-100 shadow-inner min-h-[70vh]">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        {/* ❌ NO drawer-overlay */}

        <ul className="menu p-6 w-64 bg-white shadow-lg rounded-r-xl min-h-full border-r border-indigo-100">
          <li className="mb-4">
            <Link to="/" className="text-indigo-900 font-semibold hover:text-teal-600">
              Homepage
            </Link>
          </li>

          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
              <li><NavLink to="/dashboard/manage-books">Manage Books</NavLink></li>
              <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
            </>
          )}

          {role === "librarian" && (
  <>
    <li><NavLink to="/dashboard/add-book">Add Book</NavLink></li>
    <li><NavLink to="/dashboard/my-book">My Books</NavLink></li>
    <li><NavLink to="/dashboard/librarian-orders">laibrarian orders</NavLink></li>
  </>
)}


          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
              <li><NavLink to="/dashboard/invoices">Invoices</NavLink></li>
              <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
              <li><NavLink to="/dashboard/my-wishlist">My Wishlist</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
