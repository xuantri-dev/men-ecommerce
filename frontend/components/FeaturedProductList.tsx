"use client";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import ProductCard from "./ProductCard";

const FeaturedProductList = () => {
  const { data: products, isLoading, error } = useFeaturedProducts();

  if (isLoading) return <p>Đang tải sản phẩm nổi bật...</p>;
  if (error) return <p>Lỗi khi tải sản phẩm nổi bật.</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 max-w-[1320px] mx-auto px-4">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductList;
