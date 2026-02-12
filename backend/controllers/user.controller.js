import { User } from "../models/User.model.js";
import * as argon2 from "argon2";
export async function getMe(req, res) {
  const payload = req.user;
  const user = await User.findById(payload.userId)
    .select("-password")
    .populate({
      path: "userDrinks",
      populate: {
        path: "drink",
      },
    })
    .populate({
      path: "weights",
      options: {
        sort: { createdAt: -1 },
      },
    });

  if (!user) throw Error("Пользователь не найден");

  return res.send(user);
}

export async function updateProfile(req, res) {
  const payload = req.user;
  const { password, ...body } = req.body;

  let avatar = null;
  const { destination, filename } = req.file;

  if (req.file) {
    avatar = `${process.env.SERVER_URL}/${destination}${filename}`;
  }

  console.log(avatar);

  const user = await User.findById(payload.userId);

  if (!user) throw Error("Пользователь не найден!");

  let hashedPassword = password ? await argon2.hash(password) : user.password;

  await user.updateOne({ ...body, avatar, password: hashedPassword });

  return res.send(user);
}
