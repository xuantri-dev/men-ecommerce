"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  EnvelopeIcon,
  UserIcon,
  KeyIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import useRequireAuth from "@/hooks/useRequireAuth";
import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type UpdateFormData = {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

const schema: Yup.ObjectSchema<UpdateFormData> = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),

  email: Yup.string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),

  password: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  confirmPassword: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .when("password", {
      is: (val: string | undefined) => !!val,
      then: (schema) => schema.required("Vui lòng xác nhận mật khẩu"),
    }),
});

const AccountPage = () => {
  useRequireAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const exp = localStorage.getItem("token_expiration");
        if (!token || !exp || +exp < Date.now())
          throw new Error("Phiên đăng nhập không hợp lệ");

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const { status, user: u } = await res.json();
        if (status) setUser(u);
      } catch (e: any) {
        toast.error(e.message);
        setTimeout(() => (window.location.href = "/login"), 1500);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Show field errors as toast
  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  }, [errors]);

  const onSubmit = async (data: UpdateFormData) => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/users/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          ...(data.password ? { password: data.password } : {}),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { user: updated } = await res.json();
      setUser(updated);
      toast.success("Cập nhật thành công!");
      setOpen(false);
      reset(); // reset form values
    } catch (e: any) {
      toast.error(e.message || "Cập nhật thất bại");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Đang tải...</p>
        </div>
        <Footer />
      </div>
    );

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="relative max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          {/* Nút chỉnh sửa */}
          <button
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setValue("fullName", user.fullName);
              setValue("email", user.email);
              setOpen(true);
            }}
            aria-label="Chỉnh sửa"
          >
            <PencilSquareIcon className="w-5 h-5 text-gray-600" />
          </button>

          <h1 className="text-gray-900 text-3xl mt-10 font-medium">
            Thông tin tài khoản
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Xem thông tin tài khoản của bạn
          </p>

          <div className="mt-6 text-left space-y-4">
            <InfoRow
              icon={<UserIcon className="w-5 h-5 text-gray-500" />}
              label="Họ và tên"
              value={user.fullName}
            />
            <InfoRow
              icon={<EnvelopeIcon className="w-5 h-5 text-gray-500" />}
              label="Email"
              value={user.email}
            />
            <InfoRow
              icon={<KeyIcon className="w-5 h-5 text-gray-500" />}
              label="Mật khẩu"
              value="********"
            />
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              toast.success("Đăng xuất thành công!");
              setTimeout(() => (window.location.href = "/login"), 1000);
            }}
            className="mt-6 mb-11 w-full h-11 rounded-full text-white bg-red-500 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Đăng xuất
          </button>

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  aria-label="Đóng"
                >
                  &times;
                </button>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Chỉnh sửa thông tin
                </h2>

                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="text-sm text-gray-600">Họ và tên</label>
                    <input
                      type="text"
                      {...register("fullName")}
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Để trống nếu không đổi"
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Nhập lại mật khẩu
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? "Đang lưu..." : "Lưu"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    {icon}
    <div className="flex flex-col">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  </div>
);
