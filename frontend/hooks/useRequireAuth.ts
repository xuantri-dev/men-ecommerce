"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("token_expiration");

    if (!token || !expiration || Date.now() >= Number(expiration)) {
      toast.error("Vui lòng đăng nhập để truy cập trang này.");
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiration");
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [router]);
};

export default useRequireAuth;
