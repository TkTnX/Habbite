import { User } from "../models/User.model.js";

export async function getMe(req, res) {
  const payload = req.user;

  const user = await User.findById(payload.userId).populate({
    path: "userDrinks",
    populate: {
      path: "drink",
    },
  });

  if (!user) throw Error("Пользователь не найден");

  return res.send(user);
}

export async function updateProfile(req, res) {
  const payload = req.user;
  const body = req.body;

  const user = await User.findById(payload.userId);

  if (!user) throw Error("Пользователь не найден!");

  await user.updateOne(body);

  return res.send(user);
}
