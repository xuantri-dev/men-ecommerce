import React from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

interface FeaturedProductListProps {
  products: Product[];
}

const FeaturedProductList: React.FC<FeaturedProductListProps> = ({
  products,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm nổi bật</h2>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-[1320px] mx-auto px-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductList;
