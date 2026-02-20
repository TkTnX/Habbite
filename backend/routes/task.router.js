import {Router} from "express"
import { auth } from "../middlewares/auth.middleware.js";
import { changeTaskStatus, createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";

const router = Router()

router.get('/', auth, getTasks)
router.post('/', auth, createTask)
router.patch('/:id', auth, updateTask)
router.patch('/change-status/:id', auth, changeTaskStatus)
router.delete('/:id', auth, deleteTask)


export default router