import express from "express";
import { register, login, getMe, logout } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register as any);
router.post("/login", login as any);
router.get("/me", protect as any, getMe as any);
router.post("/logout", logout as any);

export default router;
