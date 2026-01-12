
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiUser } from "react-icons/fi";
import Logo from "../../../../Components/logo/logo";
import useAuth from "../../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout, loading, role } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => logout().catch(console.log);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const navLinksLoggedOut = [
    { name: "Home", to: "/" },
    { name: "Books", to: "/books" },
    { name: "Coverage", to: "/coverage" },
  ];

  const navLinksLoggedIn = [
    { name: "Home", to: "/" },
    { name: "Books", to: "/books" },
    { name: "Coverage", to: "/coverage" },
    { name: "About Us", to: "/about" },
    { name: "Privacy", to: "/privacy" },
  ];

  const renderLinks = user ? navLinksLoggedIn : navLinksLoggedOut;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-teal-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-14 py-4 flex items-center justify-between text-indigo-900 dark:text-gray-200">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* CENTER - Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-lg font-medium">
          {renderLinks.map(link => (
            <motion.li
              key={link.to}
              whileHover={{ scale: 1.1 }}
              className="transition-colors duration-300"
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-600 dark:text-teal-400 font-semibold"
                    : "hover:text-teal-500 dark:hover:text-teal-300"
                }
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {role === "librarian" && (
              <NavLink
                to="/dashboard/add-book"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-teal-400 transition-all duration-300"
              >
                Add Book
              </NavLink>
            )}

            {user && (
              <NavLink
                to="/dashboard"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
              >
                Dashboard
              </NavLink>
            )}

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(prev => !prev)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                  <FiUser size={20} /> {user?.name?.split(" ")[0] || "Profile"}
                </button>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 flex flex-col"
                  >
                    <NavLink
                      to="/dashboard/my-profile"
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard/my-orders"
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Orders
                    </NavLink>
                    <NavLink
                      to="/dashboard/my-wishlist"
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      Wishlist
                    </NavLink>
                    <button
                      onClick={() => { handleLogout(); setProfileOpen(false); }}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 font-semibold text-left"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {!user && (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-xl border-2 border-indigo-600 text-indigo-900 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 font-semibold transition-all duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden w-full bg-white dark:bg-gray-900 shadow-md rounded-b-xl flex flex-col gap-2 px-4 py-4"
        >
          {renderLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-teal-600 dark:text-teal-400 font-semibold"
                  : "hover:text-teal-500 dark:hover:text-teal-300"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>

          {role === "librarian" && (
            <NavLink
              to="/dashboard/add-book"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-teal-400 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Add Book
            </NavLink>
          )}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl border-2 border-indigo-600 text-indigo-900 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 font-semibold transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
