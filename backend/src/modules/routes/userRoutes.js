import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { completeTask, getUserProfile } from "../controller/userController.js";

const userRouting = Router();

userRouting.get("/profile", protect, getUserProfile);
userRouting.post("/tasks/:taskId/complete", protect, completeTask);

export default userRouting;