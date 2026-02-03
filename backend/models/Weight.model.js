import { model, Schema } from "mongoose";

const weightSchema = new Schema(
  {
    weight: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Weight = model("Weight", weightSchema);
