"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getImageUrl } from "@/lib/getImageUrl";
import { Category } from "@/types/category";
import { fetchCategories, deleteCategory } from "@/services/category.service";
import AddCategoryForm from "@/components/AddCategoryForm";
import EditCategoryForm from "@/components/EditCategoryForm";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [newCategory, ...prev]);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token") || "";
      await deleteCategory(id, token);
      setCategories((prev) => prev.filter((category) => category._id !== id));
      toast.success("Đã xóa danh mục thành công!");
    } catch (err: unknown) {
      let errorMessage = "Xóa danh mục thất bại!";
      if (err instanceof Response) {
        try {
          const errorData = await err.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonErr) {
          console.error("Lỗi phân tích JSON:", jsonErr);
        }
      }
      toast.error(errorMessage);
      // console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || "";
        const categoryData = await fetchCategories(token);
        setCategories(categoryData);
      } catch (err: unknown) {
        setError("Không thể tải danh mục.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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
              onClick={() => setShowAddForm(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Thêm danh mục
            </button>
          </div>

          {showAddForm && (
            <AddCategoryForm
              onClose={() => setShowAddForm(false)}
              onAdd={handleAddCategory}
            />
          )}

          {editingCategory && (
            <EditCategoryForm
              initialCategory={editingCategory}
              onClose={() => setEditingCategory(null)}
              onUpdate={handleUpdateCategory}
            />
          )}

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
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                    <th className="p-4 text-left">Tên danh mục</th>
                    <th className="p-4 text-left">Slug</th>
                    <th className="p-4 text-left">Hình ảnh</th>
                    <th className="p-4 text-left">Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="p-4 text-gray-900 dark:text-white">
                        {category.name}
                      </td>
                      <td className="p-4 text-gray-900 dark:text-white">
                        {category.slug}
                      </td>
                      <td className="p-4">
                        {category.image && (
                          <Image
                            src={getImageUrl(category.image)}
                            alt={category.name}
                            width={80} // ✅ Thêm width
                            height={80} // ✅ Thêm height
                            className="object-cover rounded border"
                          />
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setEditingCategory(category)}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
