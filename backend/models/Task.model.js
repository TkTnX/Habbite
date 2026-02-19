import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: String, required: true },
    color: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Task = model("Task", taskSchema);
