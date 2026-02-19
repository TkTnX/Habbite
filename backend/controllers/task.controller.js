import { Task } from "../models/Task.model.js";

export async function getTasks(req, res) {
  const payload = req.user;
  const tasks = await Task.find({ user: payload.userId });
  console.log(tasks);
  if (!tasks || tasks.length === 0)
    return res.status(404).json({ error: "Задач нет!" });

  return res.status(200).json(tasks);
}

export async function createTask(req, res) {
  const payload = req.user;
  const body = req.body;
  console.log(body);
  const newTask = await Task.create({
    title: body.title,
    text: body.text,
    user: payload.userId,
    date: body.date,
    color: body.color,
  });

  if (!newTask)
    return res.status(400).json({ error: "Ошибка при создании задачи" });

  return res.status(201).json(newTask);
}
