import React from "react";
import { TaskList } from "../../components/admin/TaskList";

const TasksPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Manage Tasks</h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <TaskList />
      </div>
    </div>
  );
};
export default TasksPage;
