export interface Task {
  _id: string;
  title: string;
  description: string;
  points: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}