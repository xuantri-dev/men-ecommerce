import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/product.service";
import { Product } from "@/types/product";

// Custom hook để lấy danh sách tất cả sản phẩm
export const useProducts = (token?: string) => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(token),
    enabled: !!token, // chỉ gọi khi có token (nếu yêu cầu auth)
  });
};
