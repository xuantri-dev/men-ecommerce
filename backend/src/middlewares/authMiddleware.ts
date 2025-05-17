import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  iat?: number; // Issued at (optional)
  exp?: number; // Expiration (optional)
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Kiểm tra header Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      status: false,
      message: "Token không tồn tại hoặc không đúng định dạng",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  // Kiểm tra JWT_SECRET
  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      status: false,
      message: "Lỗi cấu hình server: JWT_SECRET không được định nghĩa",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    (req as any).user = decoded; // Gắn decoded token vào req.user
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ status: false, message: "Token đã hết hạn" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ status: false, message: "Token không hợp lệ" });
    } else {
      res
        .status(401)
        .json({ status: false, message: "Xác thực token thất bại" });
    }
  }
};
