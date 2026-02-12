import { User } from "../models/User.model.js";
import { Weight } from "../models/Weight.model.js";

export async function addWeight(req, res) {
  const payload = req.user;
  const { weight } = req.body;

  const user = await User.findById(payload.userId).populate("weights");
  if (!user) throw Error("Пользователь не найден!");
  const now = new Date();
  const isAddedToday = user.weights.find(
    (w) => new Date(w.createdAt).toDateString() === now.toDateString(),
  );

  if (isAddedToday) {
    const currWeight = await Weight.findByIdAndUpdate(isAddedToday._id, {
      weight,
    });

    return res.send(currWeight);
  }

  const newWeight = await Weight.create({ weight, user });

  await User.findByIdAndUpdate(user._id, {
    $push: { weights: newWeight },
  });

  return res.send(newWeight);
}
