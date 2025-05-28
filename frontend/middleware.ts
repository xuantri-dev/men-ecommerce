import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: number;
  exp?: number;
}

// Bảo vệ các route admin bắt đầu bằng /admin/* và /account
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Nếu không có token, chuyển hướng về trang đăng nhập
  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=unauthenticated", request.url)
    );
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Kiểm tra thời gian hết hạn
    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      console.warn("Token expired or no expiration set:", { token });
      return NextResponse.redirect(
        new URL("/login?error=token_expired", request.url)
      );
    }

    // Kiểm tra vai trò admin (role: 0 hoặc 1) cho /admin/*
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const isAdmin = decoded.role === 0 || decoded.role === 1;
      if (!isAdmin) {
        console.warn("Unauthorized access attempt:", { role: decoded.role });
        return NextResponse.redirect(
          new URL("/?error=unauthorized", request.url)
        );
      }
    }

    // Token hợp lệ, tiếp tục
    return NextResponse.next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Invalid token in middleware:", { error: errorMessage });
    return NextResponse.redirect(
      new URL("/login?error=invalid_token", request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*", "/account"], // Thêm /account vào matcher
};
