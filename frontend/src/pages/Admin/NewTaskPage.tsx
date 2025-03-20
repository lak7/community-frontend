import React from 'react';
import TaskForm from '../../components/admin/TaskForm';

const NewTaskPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm />
    </div>
  );
};
export default NewTaskPage;