"use client";
import React, { useEffect, useState } from "react";

const AdminHeader: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isFixed && <div className="h-[80px]" />}

      <div
        className={`bg-white shadow-md transition-all duration-300 h-[80px] ${
          isFixed
            ? "fixed top-0 left-0 w-full z-50 animate-slideDown"
            : "relative w-full"
        }`}
      >
        <div className="w-full px-[12.5%] flex justify-between items-center h-full">
          {/* Search Form */}
          <form className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Search
            </button>
          </form>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-md">
              Dark/Light Mode
            </button>
            <button className="p-2 bg-gray-200 rounded-md">
              Notifications
            </button>
            <button className="p-2 bg-gray-200 rounded-md">Messages</button>

            <div className="flex items-center space-x-2">
              <img
                src="/user1.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span>John Doe</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 1.5s ease forwards;
        }
      `}</style>
    </>
  );
};

export default AdminHeader;
