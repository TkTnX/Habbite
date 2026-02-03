import Router from "express"
import { createDrink, createUserDrink } from "../controllers/drink.controller.js"
import { auth } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/', createDrink)
router.post("/user", auth, createUserDrink);

export default router