import { Task } from "./Task"; // Adjust the path as needed

export interface Submission {
  _id: string;
  taskId: string;
  userId: string;
  submissionContent: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  taskDetails?: Task;
  userDetails?: {
    _id: string;
    name: string;
    email: string;
  }
};