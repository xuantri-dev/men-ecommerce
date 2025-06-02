import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  deleteUser,
  getCurrentUser,
  updateUserInfo,
  logoutUser,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// http://localhost:5000/api/users
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getCurrentUser);
router.get("/:id", verifyToken, getUserById);
router.delete("/:id", verifyToken, deleteUser);
router.put("/update", verifyToken, updateUserInfo);
router.post("/logout", logoutUser);

export default router;
