import mongoose, { Schema } from "mongoose";

const TaskCompletionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    image: { type: String, required: true }, // Cloudinary URL
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    completedAt: { type: Date, default: Date.now },
    pointsEarned: { type: Number, required: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date
});

// Allow only one approved completion per user-task pair
TaskCompletionSchema.index(
    { user: 1, task: 1 },
    {
        unique: true,
        partialFilterExpression: { status: 'approved' }
    }
);
export const TaskCompletion = mongoose.model('TaskCompletion', TaskCompletionSchema);