"use client";
import React, { useState, useEffect } from "react";

const AdminContainer: React.FC = () => {
  const [stats, setStats] = useState({
    newOrders: 0,
    revenue: 0,
    lowStock: 0,
  });

  useEffect(() => {
    setStats({
      newOrders: 12,
      revenue: 15000000,
      lowStock: 5,
    });
  }, []);

  return (
    <div className="p-6 sm:p-10 bg-gray-100 dark:bg-gray-800 h-[90vh]">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Chào mừng đến với ASHION Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Đơn hàng mới
          </h2>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-2">
            {stats.newOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Doanh thu hôm nay
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-300 mt-2">
            {stats.revenue.toLocaleString("vi-VN")} ₫
          </p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sản phẩm hết hàng
          </h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-300 mt-2">
            {stats.lowStock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
