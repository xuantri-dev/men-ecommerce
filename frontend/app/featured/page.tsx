// app/featured/page.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { fetchFeaturedProducts } from "@/services/product.service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Product } from "@/types/product"; // Adjust the path if needed

export default function FeaturedPage() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  return (
    <div className="bg-white text-black font-[var(--font-geist-sans)]">
      <Header />
      <main className="min-h-screen p-8 pb-20 sm:p-20 flex flex-col gap-10 items-center">
        <h1 className="text-3xl font-bold text-center">Sản phẩm nổi bật</h1>

        {isLoading && <p className="text-gray-500">Đang tải sản phẩm...</p>}
        {error && (
          <p className="text-red-500">Không thể tải sản phẩm nổi bật.</p>
        )}

        {!isLoading && products?.length === 0 && (
          <p className="text-gray-500">Không có sản phẩm nổi bật nào.</p>
        )}

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-[1320px] mx-auto px-4">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
