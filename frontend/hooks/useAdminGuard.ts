"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// nếu người dùng đã đăng nhập và có quyền admin thì không cần chuyển hướng
// nếu không thì chuyển hướng về trang đăng nhập
// nếu không có quyền admin thì chuyển hướng về trang chủ
const useAdminGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();

        if (!res.ok || !result.status || !result.user) {
          router.push("/login?message=unauthorized");
          return;
        }

        const role = result.user.role;
        if (role !== 0 && role !== 1) {
          router.push("/?message=no_permission");
          return;
        }
      } catch (error) {
        router.push("/login?message=error");
      }
    };

    checkAdmin();
  }, [router]);
};

export default useAdminGuard;
