"use client";
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "@/types/product";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6 sm:p-10 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quản lý sản phẩm
          </h1>

          {/* Nút thêm sản phẩm */}
          <div className="mb-6">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Thêm sản phẩm
            </button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white">
                  <th className="p-4 text-left">Hình ảnh</th>
                  <th className="p-4 text-left">Tên sản phẩm</th>
                  <th className="p-4 text-left">Giá</th>
                  <th className="p-4 text-left">Tồn kho</th>
                  <th className="p-4 text-left">Trạng thái</th>
                  <th className="p-4 text-left">Nổi bật</th>
                  <th className="p-4 text-left">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <div className="flex gap-2">
                        {product.images.slice(0, 2).map((img, index) => (
                          <img
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
                      {product.isHidden ? (
                        <span className="text-red-500 font-medium">Ẩn</span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          Hiển thị
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-900 dark:text-white">
                      {product.featured ? (
                        <span className="text-yellow-700 font-medium">Có</span>
                      ) : (
                        <span className="text-gray-500">Không</span>
                      )}
                    </td>

                    <td className="p-4">
                      <button className="text-blue-500 hover:underline mr-4">
                        Sửa
                      </button>
                      <button className="text-red-500 hover:underline">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
