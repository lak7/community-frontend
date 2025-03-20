import React from "react";
import { TaskList } from "../../components/admin/TaskList";

const TasksPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tasks</h1>
      <TaskList />
    </div>
  );
};
export default TasksPage;
