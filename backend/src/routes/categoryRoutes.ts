import { Router } from "express";
import {
  getAllCate,
  getCategoryById,
  addCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { upload } from "../controllers/categoryController";

const router = Router();

// http://localhost:5000/api/categories
router.get("/", getAllCate);
router.post("/addcate", upload.single("image"), addCategory);
router.delete("/deletecate/:id", deleteCategory);
router.get("/:id", getCategoryById);

export default router;
