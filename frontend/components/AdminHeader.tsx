import React from "react";

const AdminHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
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
        <button className="p-2 bg-gray-200 rounded-md">Dark/Light Mode</button>
        <button className="p-2 bg-gray-200 rounded-md">Notifications</button>
        <button className="p-2 bg-gray-200 rounded-md">Messages</button>

        {/* User Info */}
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
  );
};

export default AdminHeader;
