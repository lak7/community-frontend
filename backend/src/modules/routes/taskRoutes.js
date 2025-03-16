import { Router } from "express";
import { getAllTasks, getTaskById } from "../controller/taskController.js";

const taskRouting = Router();

taskRouting.get("/", getAllTasks);
taskRouting.get("/:taskId", getTaskById);

export default taskRouting;