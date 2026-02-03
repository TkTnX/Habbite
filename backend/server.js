import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.router.js";
import UserRouter from "./routes/user.router.js";
import DrinkRouter from "./routes/drink.router.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, async (error) => {
  if (error) return res.send({ message: error });

  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB Connected!"));
  console.log(`Server is running on  localhost:${port}`);
});

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/drink", DrinkRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Habbite API");
});
