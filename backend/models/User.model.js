import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, min: 8 },
  provider: { type: String, required: true, default: "credentials" },

  weightGoal: { type: Number, default: null },
  height: { type: Number, default: null },
  birthday: { type: Date, default: null },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  userDrinks: [{ type: Schema.Types.ObjectId, ref: "UserDrink" }],
  weights: [{ type: Schema.Types.ObjectId, ref: "Weight" }],
});

export const User = model("User", userSchema);
