import { model, Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Token = model("Token", tokenSchema);
