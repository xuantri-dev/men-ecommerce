import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Quản lý sản phẩm</h2>
        <button>Thêm sản phẩm mới</button>
        <button>Xem danh sách sản phẩm</button>
      </section>
      <section>
        <h2>Quản lý đơn hàng</h2>
        <button>Xem đơn hàng</button>
        <button>Cập nhật trạng thái đơn hàng</button>
      </section>
      <section>
        <h2>Quản lý người dùng</h2>
        <button>Xem danh sách người dùng</button>
        <button>Thêm người dùng mới</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
