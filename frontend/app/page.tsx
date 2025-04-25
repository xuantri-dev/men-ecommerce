// định nghĩa thành phần trang chính của ứng dụng Next.js
// Sử dụng React Query để lấy dữ liệu sản phẩm từ API và hiển thị chúng bằng thành phần ProductList. Xử lý trạng thái tải và lỗi khi lấy dữ liệu
"use client";

import React from "react";
import Header from "@/components/Header";
import AllProductList from "@/components/AllProductList";
import FeaturedProductList from "@/components/FeaturedProductList";
import Slider from "@/components/Slider";
import { fetchProducts, fetchFeaturedProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export default function Home() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const {
    data: featuredProducts,
    error: featuredProductsError,
    isLoading: featuredProductsLoading,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading products
      </div>
    );

  return (
    <div>
      <Marquee></Marquee>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Slider></Slider>
          <AllProductList products={products} />
          <FeaturedProductList products={featuredProducts || []} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
