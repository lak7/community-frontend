import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    totalPoints: { type: Number, default: 0 },
    completedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // for user
    createdTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // for admin
});

export const User = mongoose.model('User', UserSchema);