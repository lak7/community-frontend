import { Task } from "../models/Task.js";
import { TaskCompletion } from "../models/TaskCompletion.js";
import { User } from "../models/User.js";

const completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task)
            return res.status(404).json({ error: 'Task not found' });

        // Check for existing approved completion
        const existingApproved = await TaskCompletion.findOne({
            user: req.user.id,
            task: task._id,
            status: 'approved'
        });

        if (existingApproved)
            return res.status(400).json({ error: 'Task already completed' });

        // Create pending completion
        const submission = await TaskCompletion.create({
            user: req.user.id,
            task: task._id,
            pointsEarned: task.points,
            status: 'pending'
        });

        res.status(201).json({
            message: 'Task submitted for admin approval',
            submissionId: submission._id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { completeTask, getUserProfile };