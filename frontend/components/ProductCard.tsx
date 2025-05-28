import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { getImageUrl } from "@/lib/getImageUrl";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [img1, img2] = product.images.map(getImageUrl);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/error.png";
  };

  return (
    <div className="relative border border-[#a1a3ea] p-5 rounded-xl shadow-md w-full">
      <Link href={`/product/${product._id}`}>
        <div className="relative group h-57 overflow-hidden rounded-md my-3 mx-3">
          <img
            src={img1}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0,0,0.05,1)] group-hover:opacity-0 group-hover:scale-110"
            onError={handleImageError}
          />
          <img
            src={img2}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-[2000ms] ease-[cubic-bezier(0,0,0.05,1)] opacity-0 group-hover:opacity-100 group-hover:scale-110"
            onError={handleImageError}
          />
        </div>
      </Link>

      <div className="px-3">
        <Link href={`/product/${product._id}`}>
          <h2 className="text-base font-semibold mt-4 mb-2 hover:text-[#aec9ff] cursor-pointer">
            {product.name}
          </h2>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            {(product.price / 1000).toFixed(3).replace(".", ",")}₫
          </p>

          <div className="relative group">
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 border border-gray-300 text-white transition-all duration-300"
              aria-label="Thêm Giỏ Hàng"
            >
              <ShoppingBagIcon className="w-5 h-5" />

              {/* Tooltip */}
              <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-600 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 whitespace-nowrap">
                Thêm Giỏ Hàng
              </span>

              {/* Arrow */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
