"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useRequireAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();

        if (!res.ok || !result.status || !result.user) {
          console.error("Lỗi xác thực:", {
            status: res.status,
            result,
          });
          throw new Error(result.message || "Unauthorized");
        }
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        toast.error("Vui lòng đăng nhập để truy cập trang này.");
        router.push("/login"); // Chuyển hướng ngay lập tức
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, isLoading };
};

export default useRequireAuth;
