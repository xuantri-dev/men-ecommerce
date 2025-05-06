import React from "react";

const AdminSidebar: React.FC = () => {
  return (
    <div className="w-1/8 bg-blue-700 text-white h-full pt-5 fixed">
      <h2 className="text-xl font-bold mb-4 p-3">ASHION Admin</h2>
      <ul>
        <li className="mb-2 p-2 hover:bg-white hover:text-blue-700 w-full pl-3">
          Trang chủ
        </li>

        <li className="mb-2 p-2 hover:bg-white hover:text-blue-700 w-full pl-3">
          Sản phẩm
        </li>

        <li className="mb-2 p-2 hover:bg-white hover:text-blue-700 w-full pl-3">
          Danh mục
        </li>

        <li className="mb-2 p-2 hover:bg-white hover:text-blue-700 w-full pl-3">
          Đơn hàng
        </li>

        <li className="mb-2 p-2 hover:bg-white hover:text-blue-700 w-full pl-3">
          Người dùng
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
