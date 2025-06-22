"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import Cookies from "js-cookie";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const LoginPage = () => {
  useRedirectIfAuthenticated();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasShownError, setHasShownError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: yupResolver(schema) });

  // ✅ Hiển thị toast nếu có lỗi từ query và xóa query khỏi URL
  useEffect(() => {
    const error = searchParams.get("error");

    if (error && !hasShownError) {
      if (error === "unauthenticated") {
        toast.error("Vui lòng đăng nhập để tiếp tục!");
      } else {
        toast.error("Đã xảy ra lỗi không xác định.");
      }

      setHasShownError(true);

      // ✅ Xoá query error khỏi URL bằng replace (không reload)
      router.replace("/login");
    }
  }, [searchParams, hasShownError, router]);

  // ✅ Hiển thị lỗi từ react-hook-form
  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  }, [errors]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.status) {
        throw new Error(result.message || "Đăng nhập thất bại!");
      }

      // ✅ Lưu user vào cookie (nếu cần)
      Cookies.set("user", JSON.stringify(result.user), {
        expires: 1 / 24,
        secure: false,
        sameSite: "lax",
      });

      toast.success(result.message || "Đăng nhập thành công!");

      const role = result.user?.role;
      if (role === 0 || role === 1) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Lỗi đăng nhập:", errorMessage);
      toast.error(errorMessage || "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
        >
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">
            Đăng nhập
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Vui lòng đăng nhập để tiếp tục
          </p>
          <InputField
            icon={<EnvelopeIcon className="w-5 h-5 text-gray-500" />}
            placeholder="Email"
            type="text"
            register={register("email")}
          />
          <InputField
            icon={<LockClosedIcon className="w-5 h-5 text-gray-500" />}
            placeholder="Mật khẩu"
            type="password"
            register={register("password")}
          />
          <div className="mt-5 text-left text-indigo-500 text-sm">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <p className="text-gray-500 text-sm mt-3 mb-11">
            Chưa có tài khoản?{" "}
            <Link className="text-indigo-500" href="/register">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
}

const InputField = ({
  icon,
  placeholder,
  type = "text",
  register,
}: InputFieldProps) => (
  <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
      {...register}
    />
  </div>
);

export default LoginPage;
