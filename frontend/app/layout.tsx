// thiết lập cấu trúc layout cho ứng dụng Next.js
import React from "react";
import { Providers } from "@/app/providers";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "Thời Trang Nam Cao Cấp",
  description:
    "Khám phá bộ sưu tập thời trang nam cao cấp với các sản phẩm chất lượng và phong cách hiện đại.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${roboto.variable} ${openSans.variable} antialiased `}>
        <Providers>
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
