"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

interface UseProductDetailResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export default function useProductDetail(
  productId: string
): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${productId}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Sản phẩm không tồn tại hoặc có lỗi xảy ra");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Đã có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  return { product, loading, error };
}
