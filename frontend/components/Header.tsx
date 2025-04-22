"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DevicePhoneMobileIcon,
  HomeIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && window.innerWidth >= 1024) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Dummy padding để tránh che top bar khi navbar fixed */}
      {isFixed && (
        <div className="h-[80px] lg:h-[90px]"></div> // chiều cao đúng bằng navbar
      )}

      <header className="bg-white text-[#171717] border-b border-gray-200">
        {/* Top Info Bar */}
        <div className="flex justify-center items-center h-13 text-sm border-b border-gray-100 bg-[#f5f5f5] z-40 relative">
          <div className="flex gap-x-10 max-w-screen-xl w-full px-4">
            <Link
              href="tel:0999999999"
              className="flex items-center hover:text-blue-500"
            >
              <DevicePhoneMobileIcon className="h-4 w-4 mr-1" />
              0999.999.999
            </Link>
            <span className="flex items-center">
              <HomeIcon className="h-4 w-4 mr-1" />
              QTSC9, Tô Ký, Q.12, TP.HCM
            </span>
            <Link
              href="mailto:caodang@fpt.edu.vn"
              className="flex items-center hover:text-blue-500"
            >
              <EnvelopeIcon className="h-4 w-4 mr-1" />
              caodang@fpt.edu.vn
            </Link>
            <Link href="/" className="flex items-center hover:text-blue-500">
              <HomeModernIcon className="h-4 w-4 mr-1" />
              Hệ Thống Cửa Hàng
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <nav
          className={`bg-white h-20 lg:h-[90px] transition-all duration-300 ${
            isFixed
              ? "fixed top-0 left-0 w-full z-50 shadow-md animate-slideDown"
              : "relative"
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={38}
                className="w-30 h-9"
              />
            </Link>

            {/* Nav Menu */}
            <ul className="hidden md:flex flex-1 justify-center space-x-8 font-medium items-center">
              <li>
                <Link href="/shop" className="hover:text-blue-500">
                  Sản Phẩm Mới
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-500">
                  Khuyến Mãi
                </Link>
              </li>

              <li className="relative group">
                <Link
                  href="/shop"
                  className="flex items-center hover:text-blue-500"
                >
                  Áo <i className="bx bxs-chevron-down ml-1"></i>
                </Link>
              </li>

              <li className="relative group">
                <Link
                  href="/shop"
                  className="flex items-center hover:text-blue-500"
                >
                  Quần <i className="bx bxs-chevron-down ml-1"></i>
                </Link>
              </li>

              <li className="relative group">
                <Link
                  href="/shop"
                  className="flex items-center hover:text-blue-500"
                >
                  Phụ Kiện <i className="bx bxs-chevron-down ml-1"></i>
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-blue-500">
                  Liên Hệ
                </Link>
              </li>
            </ul>

            {/* Action buttons */}
            <div className="flex items-center space-x-4 -mr-1">
              <div className="h-9 w-48 hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                <input
                  type="text"
                  placeholder="Sản phẩm cần tìm..."
                  className="pl-2.5 bg-transparent text-sm outline-none px-2 py-1 text-gray-800 placeholder-gray-400 w-38 ml-3"
                />
                <button className="p-1 rounded-full transition cursor-pointer">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <Link
                href="/login"
                className="hover:text-blue-500"
                title="Đăng Nhập"
              >
                <UserIcon className="w-5" />
              </Link>

              <Link
                href="/cart"
                className="relative hover:text-blue-500"
                title="Giỏ Hàng"
              >
                <ShoppingBagIcon className="w-5" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

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

export default Header;
