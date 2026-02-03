import mongoose, { Schema } from "mongoose";

const userDrinkSchema = new Schema(
  {
    ml: { type: Number, required: true },
    drink: { type: Schema.Types.ObjectId, ref: "Drink" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export const UserDrink = mongoose.model("UserDrink", userDrinkSchema);
