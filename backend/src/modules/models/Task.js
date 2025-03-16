import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    points: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    isActive: { type: Boolean, default: true }
});

export const Task = mongoose.model('Task', TaskSchema);