import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.router.js";
import UserRouter from "./routes/user.router.js";
import DrinkRouter from "./routes/drink.router.js";
import WeightRouter from "./routes/weight.router.js";
import TaskRouter from "./routes/task.router.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import "./models/Weight.model.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/uploads', express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.listen(port, async (error) => {
  if (error) return console.log(error);

  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB Connected!"));
  console.log(`Server is running at http://localhost:${port}`);
});

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/drink", DrinkRouter);
app.use("/weight", WeightRouter);
app.use('/task', TaskRouter)

app.get("/", (req, res) => {
  res.send("Welcome to Habbite API");
});

app.use(errorMiddleware);
