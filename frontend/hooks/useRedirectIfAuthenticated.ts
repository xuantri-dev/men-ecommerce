"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("token_expiration");

    if (token && expiration) {
      const now = Date.now();
      if (now < Number(expiration)) {
        toast.info(
          "Bạn đã đăng nhập, vui lòng đăng xuất trước khi truy cập vào trang này.",
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
        setTimeout(() => router.push("/"), 1000);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiration");
      }
    }
  }, [router]);
};

export default useRedirectIfAuthenticated;
