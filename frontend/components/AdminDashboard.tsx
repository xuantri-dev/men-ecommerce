import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminContainer from "./AdminContainer";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      {/* content area: padding‑left 64 px khi ≥ md để tránh tràn dưới sidebar */}
      <div className="flex-1 pl-0 md:pl-64 flex flex-col">
        <AdminHeader />
        <AdminContainer />
      </div>
    </div>
  );
};

export default AdminDashboard;
