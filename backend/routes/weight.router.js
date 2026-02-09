import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { addWeight } from "../controllers/weight.controller.js";
const router = Router();

router.post("/", auth, addWeight);

export default router;
