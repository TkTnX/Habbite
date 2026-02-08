import Router from "express"
import { createDrink, createUserDrink, getDrinks } from "../controllers/drink.controller.js"
import { auth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", getDrinks)
router.post('/', createDrink)
router.post("/user", auth, createUserDrink);

export default router