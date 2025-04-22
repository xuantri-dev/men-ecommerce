// Đường dẫn: frontend/next.config.ts
// Mô tả: Cấu hình cho ứng dụng Next.js, bao gồm cấu hình cho phép tải hình ảnh từ localhost và các cổng khác nhau. Cấu hình này giúp ứng dụng có thể tải hình ảnh từ các nguồn bên ngoài mà không gặp phải lỗi CORS (Cross-Origin Resource Sharing).
import type { NextConfig } from "next";

// Định nghĩa cấu hình cho ứng dụng Next.js
const nextConfig: NextConfig = {
  // cấu hình cho phép sử dụng các tính năng mới của React
  images: {
    // cấu hình cho phép tải hình ảnh từ các nguồn bên ngoài
    remotePatterns: [
      {
        // sử dụng localhost với giao thức HTTP
        protocol: "http",
        // địa chỉ IP hoặc tên miền của máy chủ cung cấp hình ảnh
        hostname: "localhost",
        // cổng mà máy chủ đang lắng nghe
        port: "5000",
        // cho phép tất cả đường dẫn hình ảnh từ hostname này
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
