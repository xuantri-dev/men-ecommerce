"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/services/product.service";
import type { Product } from "@/types/product";

const AllProductList: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Đang tải sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Không thể tải danh sách sản phẩm.
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Không có sản phẩm nào để hiển thị.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Tất cả sản phẩm</h2>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-[1320px] mx-auto px-4">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductList;
