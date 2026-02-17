import { Router } from "express";
import {
  login,
  refresh,
  register,
  logout,
  sendResetEmail,
  newPassword,
} from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/registration", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", auth, logout);
router.post("/send-email", sendResetEmail);
router.patch("/new-password", newPassword);

export default router;
