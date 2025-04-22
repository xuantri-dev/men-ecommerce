import React from "react";
import Image from "next/image";
import { CreditCardIcon, TruckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer container mx-auto px-4 py-12 max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Thông tin liên hệ */}
        <div>
          <a href="/" className="inline-block mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </a>
          <h4 className="text-lg font-semibold mb-2">Liên Hệ</h4>
          <p className="text-sm mb-1">
            <span className="font-semibold">Địa Chỉ:</span> Tòa nhà QTSC9 (toà
            T), đường Tô Ký, phường Tân Chánh Hiệp, quận 12, TP HCM
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Điện Thoại: </span>
            <a href="tel:0999999999" className="hover:text-blue-600">
              0999.999.999
            </a>
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Giờ Hoạt Động: </span>10:00 - 22:00
          </p>
          <p className="text-sm mb-4">
            <span className="font-semibold">Email: </span>
            <a
              href="mailto:caodang@fpt.edu.vn"
              className="hover:text-blue-600 "
            >
              Caodang@fpt.edu.vn
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Về Chúng Tôi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Giới Thiệu
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Liên Hệ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Hệ Thống Cửa Hàng
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Thông Tin Tuyển Dụng
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Hợp Tác Kinh Doanh
              </a>
            </li>
          </ul>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hỗ Trợ Khách Hàng</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Câu Hỏi Thường Gặp
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Hướng Dẫn Mua Hàng Trực Tuyến
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Trung Tâm Hỗ Trợ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:ml-1 hover:transition-all hover:duration-300 hover:ease-custom hover:text-blue-600"
              >
                Tra Cứu Đơn Hàng
              </a>
            </li>
          </ul>
        </div>

        {/* Thanh toán */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h3>
          <div className="flex space-x-4 text-3xl text-gray-700">
            <Link href="" className="hover:text-blue-500" title="Thẻ Ngân Hàng">
              <CreditCardIcon className="w-25"></CreditCardIcon>
            </Link>
            <Link href="" className="hover:text-blue-500" title="COD">
              <TruckIcon className="w-25"></TruckIcon>
            </Link>

            <a href="#" title="Mastercard">
              <i className="bx bxl-mastercard"></i>
            </a>
            <a href="#" title="Paypal">
              <i className="bx bxl-paypal"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; 2021, Công ty Cổ phần Thời trang Ashion</p>
        <span className="mt-2 md:mt-0">Trần Xuân Trí</span>
      </div>
    </footer>
  );
};

export default Footer;
