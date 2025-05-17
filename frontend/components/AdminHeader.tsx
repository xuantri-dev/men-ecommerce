"use client";
import React, { useState, useEffect } from "react";
import {
  BellIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  avatar?: string;
}

const AdminHeader: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (data.status) {
            setUser({ name: data.user.name, avatar: data.user.avatar });
          } else {
            localStorage.removeItem("token");
            router.push("/login");
          }
        } catch (err) {
          console.error("Lỗi lấy thông tin người dùng:", err);
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    setNotifications(3); // Thay bằng API thực tế
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tìm kiếm:", searchQuery);
  };

  return (
    <div className="bg-blue-700 dark:bg-gray-900 text-white shadow-md h-[10vh] relative w-full">
      <div className="w-full px-6 sm:px-10 flex justify-between items-center h-full">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-200 absolute left-3" />
            <input
              type="text"
              placeholder="Tìm sản phẩm, đơn hàng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-40 sm:w-64"
            />
          </form>
          <button className="relative p-2 text-gray-200 hover:text-indigo-300">
            <BellIcon className="w-6 h-6" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-200 hover:text-indigo-300"
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <img
                src={user?.avatar || "/default-avatar.jpg"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-200 hidden sm:inline">
                {user?.name || "Admin"}
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
                <Link
                  href="/admin/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <UserCircleIcon className="w-5 h-5 inline mr-2" />
                  Hồ sơ
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5 inline mr-2" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
