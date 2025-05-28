import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

// Đăng ký người dùng mới
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, password, role = 2 } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ status: false, message: "Email đã tồn tại" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({ status: true, result: userWithoutPassword });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi đăng ký người dùng",
    });
  }
};

// Đăng nhập người dùng
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ status: false, message: "Email hoặc mật khẩu không đúng" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res
        .status(400)
        .json({ status: false, message: "Email hoặc mật khẩu không đúng" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    console.log("Setting cookie token:", token);
    // Lưu thông tin người dùng vào cookie 'user'
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("user", JSON.stringify(userWithoutPassword), {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        status: true,
        message: "Đăng nhập thành công",
        user: userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi đăng nhập người dùng",
    });
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res
        .status(404)
        .json({ status: false, message: "Người dùng không tồn tại" });
      return;
    }
    res.status(200).json({ status: true, result: user });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Lỗi lấy thông tin người dùng theo id" });
  }
};

// Lấy thông tin người dùng hiện tại (dựa trên token)
// export const getCurrentUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const userId = req.user?.userId;
//     console.log("User ID from token:", userId); // Debug
//     if (!userId) {
//       res
//         .status(401)
//         .json({ status: false, message: "Không có thông tin người dùng" });
//       return;
//     }

//     const user = await User.findById(userId).select("-password");
//     console.log("User from DB:", user); // Debug
//     if (!user) {
//       res
//         .status(404)
//         .json({ status: false, message: "Người dùng không tồn tại" });
//       return;
//     }

//     res.status(200).json({ status: true, user });
//   } catch (error) {
//     console.error("Lỗi khi lấy thông tin user:", error); // Log chi tiết lỗi
//     res.status(500).json({
//       status: false,
//       message: "Lỗi lấy thông tin người dùng sau khi đăng nhập",
//     });
//   }
// };
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res
        .status(401)
        .json({ status: false, message: "Không có thông tin người dùng" });
      return;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res
        .status(404)
        .json({ status: false, message: "Người dùng không tồn tại" });
      return;
    }

    res.status(200).json({ status: true, user });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    res.status(500).json({
      status: false,
      message: "Lỗi lấy thông tin người dùng",
    });
  }
};

// Xóa người dùng theo ID
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ status: false, message: "Người dùng không tồn tại" });
      return;
    }

    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Xóa người dùng thành công" });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || "Lỗi xóa người dùng",
    });
  }
};

// Cập nhật thông tin người dùng
export const updateUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res
        .status(401)
        .json({ status: false, message: "Không xác thực được người dùng" });
      return;
    }

    const { fullName, email, newPassword, confirmPassword } = req.body;

    // Kiểm tra mật khẩu mới nếu có
    let updatedFields: Partial<{
      fullName: string;
      email: string;
      password: string;
    }> = {
      fullName,
      email,
    };

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        res
          .status(400)
          .json({ status: false, message: "Mật khẩu xác nhận không khớp" });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      res
        .status(404)
        .json({ status: false, message: "Người dùng không tồn tại" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Cập nhật thông tin thành công",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Lỗi cập nhật thông tin:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Lỗi cập nhật thông tin người dùng",
    });
  }
};

// Đăng xuất người dùng
// export const logoutUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Xóa cookie 'token' bằng cách đặt giá trị rỗng và thời gian hết hạn trong quá khứ
//     res.cookie("token", "", {
//       httpOnly: true,
//       secure: false, // Phải khớp với cấu hình trong loginUser
//       sameSite: "lax", // Phải khớp với cấu hình trong loginUser
//       expires: new Date(0), // Đặt thời gian hết hạn về quá khứ
//     });

//     res.status(200).json({
//       status: true,
//       message: "Đăng xuất thành công",
//     });
//   } catch (error: any) {
//     console.error("Lỗi khi đăng xuất:", error);
//     res.status(500).json({
//       status: false,
//       message: error.message || "Lỗi khi đăng xuất",
//     });
//   }
// };
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Xóa cả cookie 'token' và 'user'
    res
      .cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(0),
      })
      .cookie("user", "", {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        expires: new Date(0),
      });

    res.status(200).json({
      status: true,
      message: "Đăng xuất thành công",
    });
  } catch (error: any) {
    console.error("Lỗi khi đăng xuất:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Lỗi khi đăng xuất",
    });
  }
};
