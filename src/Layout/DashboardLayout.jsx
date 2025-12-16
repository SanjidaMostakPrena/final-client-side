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
      <div className="drawer-content">
        <nav className="navbar bg-base-300">
          <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <h2 className="font-bold text-lg ml-4">
            {role === "admin" && "Admin Panel"}
            {role === "librarian" && "Librarian Panel"}
            {role === "user" && "User Panel"}
          </h2>
        </nav>

        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <ul className="menu p-4 w-64 bg-base-200 min-h-full">
          <li>
            <Link to="/">Homepage</Link>
          </li>

          {/* Admin */}
          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
              <li><NavLink to="/dashboard/manage-books">Manage Books</NavLink></li>
              <li><NavLink to="/dashboard/librarian-requests">Librarian Requests</NavLink></li> {/* Added link */}
              <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
            </>
          )}

          {/* Librarian */}
          {role === "librarian" && (
            <>
              <li><NavLink to="/dashboard/add-book">Add Book</NavLink></li>
              <li><NavLink to="/dashboard/my-book">My Books</NavLink></li>
              <li><NavLink to="/dashboard/order">Orders</NavLink></li>
              <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
            </>
          )}

          {/* User */}
          {role === "user" && (
            <>
              <li><NavLink to="/dashboard/my-orders">My Orders</NavLink></li>
              <li><NavLink to="/dashboard/invoices">Invoices</NavLink></li>
              <li><NavLink to="/dashboard/my-profile">My Profile</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
