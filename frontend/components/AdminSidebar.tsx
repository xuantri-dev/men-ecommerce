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
import Image from "next/image";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Trang chủ", href: "/admin", icon: HomeIcon },
    { name: "Sản phẩm", href: "/admin/product", icon: ShoppingBagIcon },
    { name: "Danh mục", href: "/admin/category", icon: TagIcon },
    {
      name: "Đơn hàng",
      href: "/admin/orders",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Người dùng", href: "/admin/customers", icon: UserGroupIcon },
  ];

  return (
    <>
      {/* Hamburger – mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-blue-700 dark:bg-gray-900 text-white w-64
          fixed inset-y-0 left-0 pt-5 z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
        `}
      >
        <div className="flex items-center px-4 mb-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <h2 className="text-xl font-bold">ASHION Admin</h2>
        </div>

        <ul className="mt-4 space-y-1">
          {menuItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                className={`
                  flex items-center p-3 rounded-l-full transition-colors
                  ${
                    pathname === href
                      ? "bg-white text-blue-700"
                      : "hover:bg-white hover:text-blue-700"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-2" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay – mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
