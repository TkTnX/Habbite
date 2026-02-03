import * as argon from "argon2";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function register(req, res) {
  const body = req.body;

  const hashedPassword = await argon.hash(body.password);

  const newUser = await User.create({ ...body, password: hashedPassword });
  if (!newUser) throw Error("Не удалось зарегистрироваться!");

  return auth(res, newUser);
}

export async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) throw Error("Неверные почта или пароль!");
  console.log({ userPass: user.password, password });
  const isPasswordCorrect = await argon.verify(user.password, password);
  if (!isPasswordCorrect) throw Error("Неверные почта или пароль!");

  return auth(res, user);
}

function generateTokens(user) {
  const payload = { userId: user._id, email: user.email };
  console.log(process.env.JWT_SECRET_KEY);
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "15m",
  });

  return { refreshToken, accessToken };
}

function auth(res, user) {
  const { accessToken, refreshToken } = generateTokens(user);

  res.setHeader("Set-Cookie", `refreshToken=${refreshToken}`);

  return res.send({ accessToken });
}
