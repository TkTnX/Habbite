import {Router} from "express"
import { auth } from "../middlewares/auth.middleware.js";
import { createTask, getTasks } from "../controllers/task.controller.js";

const router = Router()

router.get('/', auth, getTasks)
router.post('/', auth, createTask)

export default router