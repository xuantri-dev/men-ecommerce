import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
  upload,
  getRelatedProducts,
  getFeaturedProducts,
  hideProduct,
  showProduct,
  getHiddenProducts,
} from "../controllers/productController";

const router = Router();

// http://localhost:5000/api/products
// Lấy tất cả sản phẩm
router.get("/", getProducts);
// Lấy sản phẩm nổi bật
router.get("/featured", getFeaturedProducts);
// API lấy sản phẩm theo danh mục
router.get("/category/:categoryId", getProductsByCategory);
// Lấy danh sách sản phẩm đã ẩn
router.get("/hidden", getHiddenProducts);
// Ẩn sản phẩm
router.patch("/hide/:id", hideProduct);
// Hiện sản phẩm
router.patch("/show/:id", showProduct);
// thêm sản phẩm
router.post("/addproduct", upload.array("images", 2), addProduct);
// cập nhật sản phẩm
router.put("/updateproduct/:id", upload.array("images", 2), updateProduct);
// xóa sản phẩm
router.delete("/deletepro/:id", deleteProduct);
// lấy sản phẩm liên quan (có cùng danh mục với sản phẩm hiện tại nhưng không bao gồm sản phẩm hiện tại)
router.get("/:productId/related", getRelatedProducts);

// Lấy sản phẩm theo id
router.get("/:id", getProductById);

export default router;
