import { v4 as uuidv4 } from "uuid";
import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  countTasksByDate
} from "../models/taskModel.js";
import {
  isValidTitle,
  isValidDescription,
  isValidDate,
  isBoolean
} from "../utils/validate.js";

export const createNewTask = async (req, res, next) => {
  try {
    const { title, description, taskDate } = req.body;
    if (!isValidTitle(title) || !isValidDescription(description) || !isValidDate(taskDate))
      return res.status(400).json({ message: "Invalid task data" });

    const existingCount = await countTasksByDate(req.user.userId, taskDate);
    if (existingCount >= 3) return res.status(403).json({ message: "Maximum 3 tasks per day allowed" });

    const id = uuidv4();
    await createTask({ id, userId: req.user.userId, title, description, taskDate });

    return res.status(201).json({ id, userId: req.user.userId, title, description, completed: false, taskDate });
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { tasks, count } = await getTasksByUser(req.user.userId, offset, limit);
    const totalPages = Math.ceil(count / limit);

    res.json({
      tasks,
      pagination: {
        currentPage: page,
        totalPages,
        totalTasks: count,
        tasksPerPage: limit
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user.userId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const updateExistingTask = async (req, res, next) => {
  try {
    const { title, description, completed, taskDate } = req.body;

    if (!isValidTitle(title) || !isValidDescription(description) || !isValidDate(taskDate) || !isBoolean(completed))
      return res.status(400).json({ message: "Invalid data" });

    const task = await getTaskById(req.params.id, req.user.userId);
    if (!task) return res.status(404).json({ message: "Not found" });

    await updateTask(req.params.id, req.user.userId, { title, description, completed, taskDate });
    res.json({ id: req.params.id, userId: req.user.userId, title, description, completed, taskDate });
  } catch (err) {
    next(err);
  }
};

export const deleteExistingTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user.userId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await deleteTask(req.params.id, req.user.userId);
    res.json({ message: "delete" });
  } catch (err) {
    next(err);
  }
};