"use client";
import React from "react";
import AdminDashboard from "@/components/AdminDashboard";
import useAdminGuard from "@/hooks/useAdminGuard";

const AdminHome: React.FC = () => {
  useAdminGuard();
  return <AdminDashboard />;
};

export default AdminHome;
