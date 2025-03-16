import { Router } from "express";
import { createTask, deleteTask, updateTask } from "../controller/taskController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import { approveSubmission, getPendingSubmissions, rejectSubmission } from "../controller/adminController.js";

const adminRouting = Router();

// Task management
adminRouting.post("/tasks", protect, adminOnly, createTask);
adminRouting.put("/tasks/:taskId", protect, adminOnly, updateTask);
adminRouting.delete("/tasks/:taskId", protect, adminOnly, deleteTask);

// Submission management
adminRouting.get('/submissions/pending', protect, adminOnly, getPendingSubmissions);
adminRouting.put('/submissions/:submissionId/approve', protect, adminOnly, approveSubmission);
adminRouting.put('/submissions/:submissionId/reject', protect, adminOnly, rejectSubmission);

export default adminRouting;