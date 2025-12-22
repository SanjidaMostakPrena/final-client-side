import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user"); // default role = user

  useEffect(() => {
    if (user?.email) {
      // ✅ Correct API endpoint
      fetch(`http://localhost:5000/users/${user.email}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => setRole(data?.role || "user"))
        .catch(err => {
          console.error("Error fetching user role:", err);
          setRole("user"); // fallback
        });
    }
  }, [user]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content bg-white min-h-screen p-4 text-black">
        <nav className="navbar bg-white shadow-md rounded-xl mb-6 px-4 py-2 flex items-center justify-between text-black">
          <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden text-black">
            ☰
          </label>
          <h2 className="font-bold text-xl text-black">
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

        <div className="p-2 rounded-xl bg-white shadow-inner min-h-[70vh] text-black">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-6 w-64 bg-white shadow-lg rounded-r-xl min-h-full border-r border-gray-300 text-black">
          <li className="mb-4">
            <Link
              to="/"
              className="text-black font-semibold"
            >
              Homepage
            </Link>
          </li>

          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/all-users" className="text-black">All Users</NavLink></li>
              <li><NavLink to="/dashboard/manage-books" className="text-black">Manage Books</NavLink></li>
              <li><NavLink to="/dashboard/my-profile" className="text-black">My Profile</NavLink></li>
            </>
          )}

          {role === "librarian" && (
            <>
              <li><NavLink to="/dashboard/add-book" className="text-black">Add Book</NavLink></li>
              <li><NavLink to="/dashboard/my-book" className="text-black">My Books</NavLink></li>
              <li><NavLink to="/dashboard/librarian-orders" className="text-black">Librarian Orders</NavLink></li>
              <li><NavLink to="/dashboard/my-profile" className="text-black">My Profile</NavLink></li>
            </>
          )}

          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/my-orders" className="text-black">My Orders</NavLink></li>
              <li><NavLink to="/dashboard/invoices" className="text-black">Invoices</NavLink></li>
              <li><NavLink to="/dashboard/my-profile" className="text-black">My Profile</NavLink></li>
              <li><NavLink to="/dashboard/my-wishlist" className="text-black">My Wishlist</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
