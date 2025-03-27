import { Task } from "../models/Task.js";
import { TaskCompletion } from "../models/TaskCompletion.js";
import { User } from "../models/User.js";

const completeTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { imageUrl } = req.body; // Frontend sends URL from upload

        const task = await Task.findById(taskId);
        if (!task) throw new Error('Task not found');

        // Create completion with image
        const submission = await TaskCompletion.create({
            user: req.user.id,
            task: taskId,
            pointsEarned: task.points,
            image: imageUrl,
            status: 'pending'
        });

        res.json({
            message: 'Task submitted for approval',
            submission
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