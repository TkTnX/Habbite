import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: String,
  provider: String,

  weight: Number,
  weightGoal: Number,
  height: Number,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  userDrinks: [{ type: Schema.Types.ObjectId, ref: "UserDrink" }],
});

export const User = model("User", userSchema);
