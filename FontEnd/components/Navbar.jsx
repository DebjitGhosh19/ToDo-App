import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage or context
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Profile Icon & Welcome Message */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Welcome Message */}
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="text-lg font-semibold text-gray-900">{userName}</p>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              to="/home"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <span className="text-xl">🏠</span>
              <span>Home</span>
            </Link>

            {/* MyTodoList Link */}
            <Link
              to="/todos"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <span className="text-xl">📝</span>
              <span>MyTodoList</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              {/* Mobile Home Link */}
              <Link
                to="/home"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50  px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">🏠</span>
                <span>Home</span>
              </Link>

              {/* Mobile MyTodoList Link */}
              <Link
                to="/todos"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50  px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">📝</span>
                <span>MyTodoList</span>
              </Link>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-gray-700 hover:text-red-600 hover:bg-red-50  w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                <span className="text-xl">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
