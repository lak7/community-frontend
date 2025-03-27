import mongoose from "mongoose";
import { TaskCompletion } from "../models/TaskCompletion.js";
import { User } from "../models/User.js";

const getPendingSubmissions = async (req, res) => {
    try {
        const submissions = await TaskCompletion.find({ status: 'pending' })
            .populate('user', 'username')
            .populate('task', 'title points')
            .select('image pointsEarned completedAt');

        res.json(submissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const approveSubmission = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const submission = await TaskCompletion.findById(req.params.submissionId)
            .session(session)
            .populate('task', 'points');

        if (!submission)
            res.status(404).json({ error: 'Submission not found' });
        if (submission.status !== 'pending')
            res.status(400).json({ error: 'Submission already processed' });

        // Update submission
        submission.status = 'approved';
        submission.reviewedBy = req.user.id;
        submission.reviewedAt = new Date();
        await submission.save({ session });

        // Update user points
        const user = await User.findById(submission.user).session(session);
        user.totalPoints += submission.pointsEarned;
        user.completedTasks.push(submission.task);
        await user.save({ session });

        await session.commitTransaction();
        res.json({ message: 'Submission approved successfully' });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ error: error.message });
    } finally {
        session.endSession();
    }
};

const rejectSubmission = async (req, res) => {
    try {
        const submission = await TaskCompletion.findById(req.params.submissionId);
        if (!submission)
            res.status(404).json({ error: 'Submission not found' });
        if (submission.status !== 'pending')
            res.status(400).json({ error: 'Submission already processed' });

        submission.status = 'rejected';
        submission.reviewedBy = req.user.id;
        submission.reviewedAt = new Date();
        await submission.save();

        res.json({ message: 'Submission rejected successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { getPendingSubmissions, approveSubmission, rejectSubmission };