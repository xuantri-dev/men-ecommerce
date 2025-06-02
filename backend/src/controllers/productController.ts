import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy tất cả sản phẩm" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy sản phẩm theo id" });
  }
};

// Cấu hình multer để lưu trữ file trong thư mục public/images/products
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

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      featured,
      stock,
      isHidden,
    } = req.body;

    // Kiểm tra xem ảnh đã được upload thành công chưa
    if (!req.files || req.files.length === 0) {
      res
        .status(400)
        .json({ status: false, message: "Vui lòng chọn hình ảnh" });
      return;
    }

    // Chuyển đổi chuỗi JSON thành mảng thực tế nếu sizes, colors, images là chuỗi
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedColors =
      typeof colors === "string" ? JSON.parse(colors) : colors;

    // Lưu đường dẫn của tất cả các hình ảnh vào database
    const imagePaths = (req.files as Express.Multer.File[]).map(
      (file: Express.Multer.File) => {
        return `/images/${file.filename}`;
      }
    );

    // Kiểm tra categoryId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(category)) {
      res
        .status(400)
        .json({ status: false, message: "ID danh mục không hợp lệ" });
      return;
    }

    // Kiểm tra danh mục có tồn tại không
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      res
        .status(404)
        .json({ status: false, message: "Danh mục không tồn tại" });
      return;
    }

    // Kiểm tra sản phẩm có bị trùng tên không
    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      res.status(400).json({
        status: false,
        message: "Sản phẩm đã tồn tại",
      });
      return;
    }

    // Tạo mới sản phẩm
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      sizes: parsedSizes,
      colors: parsedColors,
      images: imagePaths, // Lưu đường dẫn ảnh vào database
      featured: featured || false,
      stock,
      isHidden: false, // Mặc định sản phẩm không bị ẩn
    });

    // Lưu sản phẩm vào database
    const result = await newProduct.save();

    res.status(201).json({
      status: true,
      result: result,
      message: "Thêm sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi thêm dữ liệu sản phẩm",
    });
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { categoryId } = req.params; // Lấy categoryId từ request params

    // Kiểm tra categoryId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({
        status: false,
        message: "ID danh mục không hợp lệ",
      });
      return;
    }

    // Tìm tất cả sản phẩm có category trùng với category: categoryId,
    const products = await Product.find({
      category: categoryId,
    }).populate("category");

    if (products.length === 0) {
      res.status(404).json({
        status: false,
        message: "Không có sản phẩm nào trong danh mục này",
      });
      return;
    }

    res.status(200).json({ status: true, result: products });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Lỗi lấy sản phẩm theo danh mục" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400)
        .json({ status: false, message: "ID sản phẩm không hợp lệ" });
      return;
    }

    // Tìm và xóa sản phẩm
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res
        .status(404)
        .json({ status: false, message: "Không tìm thấy sản phẩm" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi khi xóa sản phẩm" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Lấy id sản phẩm từ request params
    const {
      name,
      description,
      price,
      category,
      sizes,
      colors,
      images,
      featured,
      stock,
      isHidden,
    } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      res
        .status(404)
        .json({ status: false, message: "Sản phẩm không tồn tại" });
      return;
    }

    // Nếu category có thay đổi, kiểm tra xem danh mục có tồn tại không
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      res
        .status(400)
        .json({ status: false, message: "ID danh mục không hợp lệ" });
      return;
    }

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        res
          .status(404)
          .json({ status: false, message: "Danh mục không tồn tại" });
        return;
      }
    }

    // Chuyển đổi chuỗi JSON thành mảng thực tế nếu cần
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedColors =
      typeof colors === "string" ? JSON.parse(colors) : colors;
    const parsedImages =
      typeof images === "string" ? JSON.parse(images) : images;

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        sizes: parsedSizes,
        colors: parsedColors,
        images: parsedImages,
        featured: featured || false,
        stock,
        isHidden: isHidden !== undefined ? isHidden : existingProduct.isHidden,
      },
      { new: true } // Trả về bản ghi đã cập nhật
    );

    res.status(200).json({
      status: true,
      result: updatedProduct,
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi cập nhật sản phẩm" });
  }
};

export const getRelatedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res
        .status(400)
        .json({ status: false, message: "ID sản phẩm không hợp lệ" });
      return;
    }

    // Tìm sản phẩm gốc để lấy category
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) {
      res
        .status(404)
        .json({ status: false, message: "Sản phẩm không tồn tại" });
      return;
    }

    // Lấy sản phẩm liên quan (cùng category, loại trừ chính nó)
    const relatedProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: productId },
      isHidden: false, // Loại trừ sản phẩm bị ẩn
    }).limit(8); // Giới hạn 8 sản phẩm liên quan

    res.status(200).json({
      status: true,
      result: relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi lấy sản phẩm liên quan",
    });
  }
};

export const getFeaturedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const featuredProducts = await Product.find({
      featured: true,
      isHidden: false, // Không lấy sản phẩm bị ẩn
    }).limit(10); // Tuỳ chọn: giới hạn 10 sản phẩm

    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi lấy sản phẩm nổi bật",
    });
  }
};

export const hideProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(
      id,
      { isHidden: true },
      { new: true }
    );

    if (!updated) {
      res
        .status(404)
        .json({ status: false, message: "Không tìm thấy sản phẩm" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Đã ẩn sản phẩm",
      result: updated,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi khi ẩn sản phẩm" });
  }
};

export const showProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(
      id,
      { isHidden: false },
      { new: true }
    );

    if (!updated) {
      res
        .status(404)
        .json({ status: false, message: "Không tìm thấy sản phẩm" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Đã hiện sản phẩm",
      result: updated,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Lỗi khi hiện sản phẩm" });
  }
};

export const getHiddenProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hiddenProducts = await Product.find({ isHidden: true });

    res.status(200).json({
      status: true,
      result: hiddenProducts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi khi lấy sản phẩm đã bị ẩn",
    });
  }
};
