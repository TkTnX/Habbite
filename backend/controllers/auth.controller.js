import * as argon from "argon2";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function register(req, res) {
  const body = req.body;

  const hashedPassword = await argon.hash(body.password);

  const newUser = await User.create({ ...body, password: hashedPassword });
  if (!newUser) throw err;

  return auth(res, newUser, true);
}

export async function login(req, res) {
  const { email, password, isRemember } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw Error("Неверные почта или пароль!");

  const isPasswordCorrect = await argon.verify(user.password, password);
  if (!isPasswordCorrect) throw Error("Неверные почта или пароль!");

  return auth(res, user, isRemember);
}

export async function logout(req, res) {
  res.clearCookie("refreshToken");
  return res.status(201).send({ ok: true });
}

function generateTokens(user) {
  const payload = { userId: user._id, email: user.email };

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

function auth(res, user, isRemember = true) {
  const { accessToken, refreshToken } = generateTokens(user);

  if (isRemember) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  return res.send({ accessToken });
}

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" });

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return auth(res, user, true);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
}
