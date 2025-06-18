"use client";

import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImageUrl } from "@/lib/getImageUrl";
import useProductDetail from "@/hooks/useProductDetail";
import Image from "next/image";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = React.use(params); // unwrap Promise here

  const { product, loading, error } = useProductDetail(id);

  if (loading) return <p className="p-10 text-center">Đang tải sản phẩm...</p>;
  if (error || !product) return notFound();

  const imageUrls = product.images.map(getImageUrl);

  return (
    <div className="bg-white text-black font-[var(--font-geist-sans)]">
      <Header />

      <main className="min-h-screen px-4 sm:px-20 py-10 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Ảnh sản phẩm */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageUrls.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-xl border object-cover"
                />
              ))}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl text-red-600 font-bold mb-4">
              {product.price.toLocaleString("vi-VN")}₫
            </p>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">Kích cỡ:</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3 py-1 border rounded-full text-sm bg-gray-100"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-1">Màu sắc:</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 border rounded-full text-sm bg-gray-100"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:opacity-90 transition">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
