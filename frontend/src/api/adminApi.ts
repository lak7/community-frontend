import axios from 'axios';
import { LINK } from '../constant';
import { Task } from '../interfaces/Task';

const API_URL = `${LINK}/api`;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task Management
export const createTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
  const response = await apiClient.post('/admin/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId: string, taskData: Partial<Task>) => {
  const response = await apiClient.put(`/admin/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await apiClient.delete(`/admin/tasks/${taskId}`);
  return response.data;
};

// Submission Management
export const getPendingSubmissions = async () => {
  const response = await apiClient.get('/admin/submissions/pending');
  return response.data;
};

export const approveSubmission = async (submissionId: string, feedback?: string) => {
  const response = await apiClient.put(`/admin/submissions/${submissionId}/approve`, { feedback });
  return response.data;
};

export const rejectSubmission = async (submissionId: string, feedback: string) => {
  const response = await apiClient.put(`/admin/submissions/${submissionId}/reject`, { feedback });
  return response.data;
};