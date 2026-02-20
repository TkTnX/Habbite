import { Task } from "../models/Task.model.js";

export async function getTasks(req, res) {
  const payload = req.user;
  const tasks = await Task.find({ user: payload.userId });
  if (!tasks || tasks.length === 0)
    return res.status(404).json({ error: "Задач нет!" });

  return res.status(200).json(tasks);
}

export async function createTask(req, res) {
  const payload = req.user;
  const body = req.body;
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

export async function updateTask(req, res) {
  const payload = req.user;
  const taskId = req.params.id;
  const body = req.body;

  const task = await Task.findOne({ _id: taskId });
  if (!task || String(task.user) !== payload.userId)
    return res.status(404).json({ error: "Задача не найдена!" });

  await Task.updateOne({ _id: task._id }, body);

  return res.status(200).json({ message: "Задача изменена!" });
}

export async function changeTaskStatus(req, res) {
  const payload = req.user;
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId });
  if (!task || String(task.user) !== payload.userId)
    return res.status(404).json({ error: "Задача не найдена!" });

  await Task.updateOne({ _id: task._id }, { isCompleted: !task.isCompleted });

  return res.status(200).json({ message: "Статус задачи изменён" });
}

export async function deleteTask(req, res) {
  const payload = req.user;
  const taskId = req.params.id;

  const task = await Task.findOne({ _id: taskId });
  if (!task || String(task.user) !== payload.userId)
    return res.status(404).json({ error: "Задача не найдена!" });

  await Task.deleteOne({ _id: task._id });

  return res.status(200).json({ message: "Задача удалена!" });
}
