import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminContainer from "./AdminContainer";
import AdminHeader from "./AdminHeader";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />

      <div className="flex-1 ml-[calc(100%/8)]">
        <AdminHeader />
        <AdminContainer />
      </div>
    </div>
  );
};

export default AdminDashboard;
