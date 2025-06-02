import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export const useFeaturedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });
};
