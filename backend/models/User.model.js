import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, min: 8 },
  provider: { type: String, required: true, default: "credentials" },

  weight: Number,
  weightGoal: Number,
  height: Number,
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  userDrinks: [{ type: Schema.Types.ObjectId, ref: "UserDrink" }],
});

export const User = model("User", userSchema);
