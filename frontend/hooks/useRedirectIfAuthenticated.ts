"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify"; // Thêm import toast

const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (res.ok && result.status && result.user) {
          setIsAuthenticated(true);
          const userCookie = Cookies.get("user");
          let role = result.user?.role;
          if (userCookie) {
            const user = JSON.parse(userCookie);
            role = user?.role;
          }
          // Hiển thị toast trước khi chuyển hướng
          toast.info("Bạn đã đăng nhập!", {
            position: "top-right",
            autoClose: 2000, // Tự động đóng sau 2 giây
          });
          // Chuyển hướng dựa trên role
          if (role === 0 || role === 1) {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra xác thực:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

  return isAuthenticated;
};

export default useRedirectIfAuthenticated;
