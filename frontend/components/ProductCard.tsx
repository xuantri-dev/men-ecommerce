// Định nghĩa thành phần thẻ sản phẩm có thể tái sử dụng, hiển thị chi tiết sản phẩm như hình ảnh, tên, giá và nút "Thêm vào giỏ hàng"
// Hiển thị 1 thẻ sản phẩm với các thông tin như hình ảnh, tên, giá và nút "Thêm vào giỏ hàng"
import React, { useState } from "react";
import { Product } from "@/types/product";
import { getImageUrl } from "@/lib/getImageUrl";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: Product;
}

// Khai báo ProductCard là một Functional Component sử dụng TypeScript, và ProductCardProps là kiểu của props mà nó nhận vào.
// React.FC là một kiểu tổng quát (generic) trong React, cho phép bạn khai báo component với props đã định nghĩa.
// Hàm arrow function nhận đối tượng product từ props. Đây là sản phẩm mà chúng ta sẽ hiển thị trong thẻ sản phẩm
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Khai báo biến imgSrc để lưu trữ đường dẫn hình ảnh sản phẩm
  const image1 = getImageUrl(product.images[0]);
  const image2 = getImageUrl(product.images[1]);

  return (
    <div className="relative border border-[#a1a3ea] p-5 rounded-xl shadow-md w-full">
      <Link href={""}>
        <div className="relative group h-57 overflow-hidden rounded-md mt-2.5 mb-3 ml-3 mr-3">
          {/* Hình ảnh 1 */}
          <img
            src={image1}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0,0,0.05,1)] group-hover:opacity-0 group-hover:scale-110"
            // nếu không thể tải ảnh thành công (404, lỗi file, lỗi server...)
            // thì sẽ thay thế đường dẫn (src) của ảnh đang có (currentTarget)  bằng ảnh mặc định là /error.png
            onError={(e) => (e.currentTarget.src = "/error.png")}
          />
          {/* Hình ảnh 2 */}
          <img
            src={image2}
            alt={product.name}
            className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-[2000ms] ease-[cubic-bezier(0,0,0.05,1)] scale-100 group-hover:scale-110 group-hover:opacity-100 opacity-0 cursor-pointer"
            // nếu không thể tải ảnh thành công (404, lỗi file, lỗi server...)
            // thì sẽ thay thế đường dẫn (src) của ảnh đang có (currentTarget)  bằng ảnh mặc định là /error.png
            onError={(e) => (e.currentTarget.src = "/error.png")}
          />
        </div>
      </Link>

      <div className="mt-[0.625rem] ml-[0.75rem] mb-[0.75rem] mr-[0.75rem]">
        <Link href={""}>
          <h2 className="text-base font-semibold mt-4 mb-2 cursor-pointer hover:text-[#aec9ff]">
            {product.name}
          </h2>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-700">
            {(product.price / 1000).toFixed(3).replace(".", ",")}₫
          </p>

          <div className="relative">
            <button
              className="group w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 border border-gray-300 text-white text-sm relative transition-all duration-300 cursor-pointer"
              aria-label="Thêm Giỏ Hàng"
            >
              <ShoppingBagIcon className="w-5 h-5" />

              {/* Tooltip */}
              <span
                className="min-w-20 min-h-5 px-2 py-1 absolute bottom-full mb-3 left-1/2 -translate-x-1/2 translate-y-2 bg-blue-600 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-100 flex items-center justify-center"
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.71, 1.7, 0.77, 1.24)",
                }}
              >
                Thêm Giỏ Hàng
              </span>

              {/* Mũi tên */}
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 mb-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.71, 1.7, 0.77, 1.24)",
                }}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
