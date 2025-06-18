import { Router } from "express";
import {
  getAllCate,
  getCategoryById,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController";
// import { upload } from "../controllers/categoryController";

import upload from "../middlewares/upload";

const router = Router();

// http://localhost:5000/api/categories
router.get("/", getAllCate);
router.post("/addcate", upload.single("image"), addCategory);
router.delete("/deletecate/:id", deleteCategory);
router.get("/:id", getCategoryById);
router.put("/updatecate/:id", upload.single("image"), updateCategory);

export default router;
