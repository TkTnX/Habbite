import { Router } from "express";
import { getMe, updateProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/me", auth, getMe);
router.patch("/", auth, upload.single('image'), updateProfile)

export default router