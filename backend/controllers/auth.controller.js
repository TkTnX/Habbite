import * as argon from "argon2";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Resend } from "resend";
import * as crypto from "crypto";
import { Token } from "../models/Token.model.js";
dotenv.config();
const resend = new Resend(process.env.RESEND_KEY);

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

export async function sendResetEmail(req, res) {
  const now = new Date();
  const { email } = req.body;

  const token = crypto.randomBytes(32).toString("hex");

  await Token.create({
    token,
    email,
    expiresAt: now.setMinutes(now.getMinutes() + 15),
  });

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Восстановление пароля",
    html: `
    <h1>Восстановление пароля от аккаунта ${email}</h1>
    <br />
    <p>Похоже, вы забыли пароль. Чтобы изменить его <a href='${process.env.CLIENT_URL}/auth/new-password?token=${token}'>перейдите по ссылке.</a></p>
    <br />
    <b>Если это были не вы, проигнорируйте данное письмо!</b>
    `,
  });

  if (error) return res.status(400).json({ error });

  res.status(200).json({ data });
}

export async function newPassword(req, res) {
  const { token, password } = req.body;

  const isTokenExists = await Token.findOne({ token });

  if (!isTokenExists)
    return res.status(400).json({ message: "Токен не найден" });

  if (isTokenExists.expiresAt < new Date())
    res.status(400).json({ message: "Токен истёк" });

  const hashedPassword = await argon.hash(password);

  await User.updateOne(
    { email: isTokenExists.email },
    { password: hashedPassword },
  );

  await Token.deleteOne({ _id: isTokenExists._id });

  res.status(200).json({ message: "Пароль успешно изменён!" });
}
