import { User } from "../models/User.model.js";
import { Weight } from "../models/Weight.model.js";

export async function addWeight(req, res) {
  const payload = req.user;
  const { weight } = req.body;

  const user = await User.findById(payload.userId);
  if (!user) throw Error("Пользователь не найден!");

  const newWeight = await Weight.create({ weight, user });

  await User.findByIdAndUpdate(user._id, {
    $push: { weights: newWeight },
  });

  return res.send(newWeight);
}
