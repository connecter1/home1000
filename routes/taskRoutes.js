import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createNewTask,
  getAllTasks,
  getTask,
  updateExistingTask,
  deleteExistingTask
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authenticate);
router.post("/", createNewTask);
router.get("/", getAllTasks);
router.get("/:id", getTask);
router.put("/:id", updateExistingTask);
router.delete("/:id", deleteExistingTask);
export default router;