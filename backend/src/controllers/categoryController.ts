import { Request, Response } from "express";
import Category from "../models/Category";
import slugify from "slugify";
import multer from "multer";
import path from "path";
import Product from "../models/Product";
import mongoose from "mongoose";

// Cấu hình multer để lưu trữ file trong thư mục public/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đường dẫn đến thư mục lưu trữ
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage: storage });

export const getAllCate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh mục (getAllCate)" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Danh mục không tồn tại" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh mục (getCategoryById)" });
  }
};

export const addCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!:@]/g });

    // Kiểm tra xem file đã được upload thành công chưa
    if (!req.file) {
      res.status(400).json({ status: false, message: "Vui lòng chọn ảnh" });
      return;
    }

    const image = `/images/${req.file.filename}`;

    const newCategory = new Category({
      name,
      slug,
      image,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ status: true, result: savedCategory });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi thêm dữ liệu danh mục",
    });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Kiểm tra danh mục có tồn tại không
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(404)
        .json({ status: false, message: "Danh mục không tồn tại" });
      return;
    }

    // kiểm tra danh mục còn sản phẩm không
    const pros = await Product.find({
      category: new mongoose.Types.ObjectId(id),
    });

    if (pros.length > 0) {
      res.status(400).json({
        status: false,
        message: "Danh mục còn sản phẩm, không thể xóa",
      });
      return;
    }

    // Nếu không có sản phẩm, tiến hành xóa danh mục
    await Category.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "Xóa danh mục thành công" });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || "Lỗi xóa danh mục",
    });
  }
};
