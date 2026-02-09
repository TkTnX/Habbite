import { User } from "../models/User.model.js";

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
  const body = req.body;

  const user = await User.findById(payload.userId);

  if (!user) throw Error("Пользователь не найден!");

  await user.updateOne(body);

  return res.send(user);
}
