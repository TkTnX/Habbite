import { Drink } from "../models/Drink.model.js";
import { User } from "../models/User.model.js";
import { UserDrink } from "../models/UserDrink.model.js";

export async function createDrink(req, res) {
  const body = req.body;

  const drink = await Drink.create(body);

  if (!drink) throw Error("Напиток не был создан!");

  return res.send(drink);
}

export async function createUserDrink(req, res) {
  const payload = req.user;
  const body = req.body;

  const userDrink = await UserDrink.create({ ...body, user: payload.userId });
  if (!userDrink) throw Error("Ошибка при добавлении напитка");

  await User.findByIdAndUpdate(payload.userId, {
    $push: { userDrinks: userDrink._id },
  });

  return res.send(userDrink);
}
