"use client";

import React, { useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import Marquee from "@/components/Marquee";
import AllProductList from "@/components/AllProductList";
import FeaturedProductList from "@/components/FeaturedProductList";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      switch (error) {
        case "unauthorized":
          toast.error("Bạn không có quyền truy cập trang admin");
          break;
        case "unauthenticated":
          toast.error("Vui lòng đăng nhập để tiếp tục");
          break;
        case "token_expired":
          toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
          break;
        case "invalid_token":
          toast.error("Token không hợp lệ, vui lòng đăng nhập lại");
          break;
        default:
          toast.error("Lỗi không xác định");
          break;
      }

      // ✅ Xoá query khỏi URL sau khi xử lý (không reload lại trang)
      router.replace("/");
    }
  }, [error, router]);

  return (
    <div className="bg-white text-black font-[var(--font-geist-sans)]">
      <Marquee />
      <Header />

      <main className="min-h-screen px-4 sm:px-20 py-10 sm:py-20 flex flex-col gap-16 items-center">
        <Slider />
        <AllProductList />
        <FeaturedProductList />
      </main>

      <Footer />
    </div>
  );
}
