import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
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
});

export const User = mongoose.model("User", userSchema);
