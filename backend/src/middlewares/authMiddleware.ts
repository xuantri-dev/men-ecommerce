import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  role: number;
  iat?: number;
  exp?: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Request headers:", req.headers);
  console.log("Cookies:", req.cookies);

  let token;
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.error("No token found");
    res.status(401).json({
      status: false,
      message: "Không tìm thấy token trong cookie hoặc header",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as DecodedToken;
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({
      status: false,
      message: "Token không hợp lệ hoặc đã hết hạn",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
