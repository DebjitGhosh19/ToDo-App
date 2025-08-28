import React from "react";
import { Link } from "react-router-dom";
import todo from "../assets/images/todo.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 lg:px-20 py-12">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-ping"></span>
              ✨ Organize your life, one task at a time
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Organize work and life{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                finally
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Organize your day, achieve your goals — with MyTodo, productivity
              made{" "}
              <span className="font-semibold text-gray-800">
                simple, smart, and effective.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-amber-600 hover:to-orange-600"
                to="/register"
              >
                <span className="mr-2">🚀</span>
                Get Started Free
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>

              <Link
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg"
                to="/login"
              >
                <span className="mr-2">🔐</span>
                Sign In
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No credit card required
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Free forever
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Image container with shadow and border */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={todo}
                alt="Todo App Interface"
                className="w-full max-w-lg h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
              <span className="text-2xl">✅</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">📝</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Landing;
