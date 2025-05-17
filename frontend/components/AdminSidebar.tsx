"use client";
import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Trang chủ", href: "/admin", icon: HomeIcon },
    { name: "Sản phẩm", href: "/admin/products", icon: ShoppingBagIcon },
    { name: "Danh mục", href: "/admin/categories", icon: TagIcon },
    {
      name: "Đơn hàng",
      href: "/admin/orders",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Người dùng", href: "/admin/customers", icon: UserGroupIcon },
  ];

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-900 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-700 dark:bg-gray-900 text-white w-64 h-screen pt-5 fixed md:static transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <div className="flex items-center px-4 mb-6">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <h2 className="text-xl font-bold">ASHION Admin</h2>
        </div>
        <ul className="mt-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`mb-2 p-3 rounded-l-full transition-colors ${
                pathname === item.href
                  ? "bg-white text-blue-700"
                  : "hover:bg-white hover:text-blue-700"
              }`}
            >
              <Link href={item.href} className="flex items-center">
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
