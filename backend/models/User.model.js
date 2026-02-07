import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, min: 8 },
  provider: { type: String, required: true, default: "credentials" },

  weight: { type: Number, required: true, default: null },
  weightGoal: { type: Number, required: true, default: null },
  height: { type: Number, required: true, default: null },
  birthday: { type: Date, required: true, default: null },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  userDrinks: [{ type: Schema.Types.ObjectId, ref: "UserDrink" }],
});

export const User = model("User", userSchema);
