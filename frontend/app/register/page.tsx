import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex items-center justify-center py-16">
        <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">Đăng ký</h1>
          <p className="text-gray-500 text-sm mt-2">
            Vui lòng tạo tài khoản để tiếp tục
          </p>
          <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <UserIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Họ và tên"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <LockClosedIcon className="w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Đăng ký
          </button>
          <p className="text-gray-500 text-sm mt-3 mb-11">
            Đã có tài khoản?
            <Link className="text-indigo-500" href="/login">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
