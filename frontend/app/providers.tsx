// Thiết lập các nhà cung cấp ngữ cảnh cho ứng dụng
// QueryClient Provider: Cung cấp ngữ cảnh cho React Query, cho phép sử dụng các hook của React Query trong ứng dụng
// Sử dụng QueryClientProvider của React Query để cung cấp cấu hình client truy vấn cho các thành phần con.
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
