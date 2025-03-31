import { Task } from "./Task"; // Assuming Task is defined in Task.ts
export interface Submission {
  _id: string;
  taskId: string;
  userId: string;
  submissionContent: string;
  status: "pending" | "approved" | "rejected";
  feedback?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  task?: Task; // Updated from taskDetails to match API response
  user?: {
    _id: string;
    username: string; // Updated from 'name' to 'username' as per API response
  };
  image?: string; // Added because the API response includes an image
  pointsEarned?: number; // Added to match the API response
  completedAt?: Date; // Added based on the API response
}
