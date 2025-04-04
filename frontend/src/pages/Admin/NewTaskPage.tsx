import React from "react";
import TaskForm from "../../components/admin/TaskForm";

const NewTaskPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Create New Task</h1>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <TaskForm />
      </div>
    </div>
  );
};
export default NewTaskPage;
