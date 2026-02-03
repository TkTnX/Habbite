import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/User.model.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, async (error) => {
  if (error) return res.send({ message: error });

  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB Connected!"));

  console.log(`Server is running on  localhost:${port}`);
});

app.use("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
