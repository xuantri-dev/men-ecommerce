"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getImageUrl } from "@/lib/getImageUrl";
import { Category } from "@/types/category";
import {
  fetchCategories,
  //   deleteCategory,
} from "@/services/category.service";
// import AddCategoryForm from "@/components/AddCategoryForm";
// import EditCategoryForm from "@/components/EditCategoryForm";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //   const [showAddForm, setShowAddForm] = useState(false);
  //   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //   const handleAddCategory = (newCategory: Category) => {
  //     setCategories((prev) => [newCategory, ...prev]);
  //     setCurrentPage(1);
  //   };

  const handleDeleteCategory = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!confirm) return;

    try {
      //   const token = localStorage.getItem("token") || "";
      //   await deleteCategory(id, token);
      setCategories((prev) => prev.filter((category) => category._id !== id));
      toast.success("Đã xóa danh mục thành công!");
    } catch (err) {
      toast.error("Xóa danh mục thất bại!");
      console.error(err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const categoryData = await fetchCategories(token);
      setCategories(categoryData);
      setCurrentPage(1); // Reset về trang đầu
    } catch (err: unknown) {
      setError("Không thể tải danh mục.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader />
        <div className="p-6 sm:p-10 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quản lý danh mục
          </h1>

          <div className="mb-6">
            <button
              //   onClick={() => setShowAddForm(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Thêm danh mục
            </button>
          </div>

          {/* {showAddForm && (
            <AddCategoryForm
              onClose={() => setShowAddForm(false)}
              onAdd={handleAddCategory}
            />
          )} */}

          {/* {editingCategory && (
            <EditCategoryForm
              initialCategory={editingCategory}
              onClose={() => setEditingCategory(null)}
              onUpdate={() => {
                toast.success("Cập nhật danh mục thành công!");
                setEditingCategory(null);
                loadData(); // Cập nhật lại danh mục
              }}
            />
          )} */}

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Đang tải...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : categories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Không có danh mục nào.
              </div>
            ) : (
              <>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                      <th className="p-4 text-left">Hình ảnh</th>
                      <th className="p-4 text-left">Tên danh mục</th>
                      <th className="p-4 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCategories.map((category) => (
                      <tr
                        key={category._id}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          {category.image && (
                            <Image
                              src={getImageUrl(category.image)}
                              alt={category.name}
                              width={64}
                              height={64}
                              className="object-cover rounded border"
                            />
                          )}
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          {category.name}
                        </td>
                        <td className="p-4">
                          <button
                            // onClick={() => setEditingCategory(category)}
                            className="text-blue-500 hover:underline mr-4 cursor-pointer"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="text-red-500 hover:underline cursor-pointer"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2 mb-6">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 bg-gray-200 rounded ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    &larr; Trước
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white cursor-default"
                          : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 bg-gray-200 rounded ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    Sau &rarr;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
