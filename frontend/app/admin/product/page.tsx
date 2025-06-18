"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import {
  fetchProducts,
  deleteProduct,
  toggleProductVisibility,
  toggleProductFeatured,
} from "@/services/product.service";
import { fetchCategories } from "@/services/category.service";
import AddProductForm from "@/components/AddProductForm";
import EditProductForm from "@/components/EditProductForm";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setCurrentPage(1);
  };

  const handleDeleteProduct = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token") || "";
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("Đã xóa sản phẩm thành công!");
    } catch (err) {
      toast.error("Xóa sản phẩm thất bại!");
      console.error(err);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const updated = await toggleProductVisibility(id, token);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isHidden: updated.isHidden } : p
        )
      );
      toast.success("Cập nhật trạng thái hiển thị thành công!");
    } catch (err) {
      toast.error("Không thể cập nhật trạng thái hiển thị.");
      console.error(err);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const updated = await toggleProductFeatured(id, token);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, featured: updated.featured } : p
        )
      );
      toast.success("Cập nhật trạng thái nổi bật thành công!");
    } catch (err) {
      toast.error("Không thể cập nhật trạng thái nổi bật.");
      console.error(err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const [productData, categoryData] = await Promise.all([
        fetchProducts(token),
        fetchCategories(token),
      ]);
      setProducts(productData);
      setCategories(categoryData);
      setCurrentPage(1); // reset về trang đầu
    } catch (err: unknown) {
      setError("Không thể tải dữ liệu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCategoryNameById = (id: string) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.name : "Không rõ";
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader />
        <div className="p-6 sm:p-10 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quản lý sản phẩm
          </h1>

          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Thêm sản phẩm
            </button>
          </div>

          {showAddForm && (
            <AddProductForm
              categories={categories}
              onClose={() => setShowAddForm(false)}
              onAdd={handleAddProduct}
            />
          )}

          {editingProduct && (
            <EditProductForm
              categories={categories}
              initialProduct={editingProduct}
              onClose={() => setEditingProduct(null)}
              onUpdate={() => {
                toast.success("Cập nhật sản phẩm thành công!");
                setEditingProduct(null);
                loadData();
              }}
            />
          )}

          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Đang tải...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : products.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Không có sản phẩm nào.
              </div>
            ) : (
              <>
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                      <th className="p-4 text-left">Hình ảnh</th>
                      <th className="p-4 text-left">Tên sản phẩm</th>
                      <th className="p-4 text-left">Giá</th>
                      <th className="p-4 text-left">Tồn kho</th>
                      <th className="p-4 text-left">Danh mục</th>
                      <th className="p-4 text-left">Trạng thái</th>
                      <th className="p-4 text-left">Nổi bật</th>
                      <th className="p-4 text-left">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <div className="flex gap-2">
                            {product.images.slice(0, 2).map((img, index) => (
                              <Image
                                key={index}
                                src={getImageUrl(img)}
                                alt={`${product.name} - ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          {product.name}
                          <div className="text-sm text-gray-500">
                            {product.description}
                          </div>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          {product.price.toLocaleString("vi-VN")} ₫
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          {product.stock}
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          {getCategoryNameById(product.category)}
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleToggleVisibility(product._id)}
                            className="underline hover:text-blue-600"
                          >
                            {product.isHidden ? (
                              <span className="text-red-500 font-medium">
                                Ẩn
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">
                                Hiển thị
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleToggleFeatured(product._id)}
                            className="underline hover:text-blue-600"
                          >
                            {product.featured ? (
                              <span className="text-yellow-700 font-medium">
                                Có
                              </span>
                            ) : (
                              <span className="text-gray-500">Không</span>
                            )}
                          </button>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-500 hover:underline mr-4 cursor-pointer"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
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

export default ProductsPage;
