import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task } from "../../interfaces/Task";
import { deleteTask } from "../../api/adminApi";
import { LINK } from "../../constant";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${LINK}/api/tasks`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      setShowDeleteConfirm(null);
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center p-4 text-gray-300">Loading tasks...</div>
    );

  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b border-gray-800 mb-4">
        <h2 className="text-xl font-bold text-white">Tasks</h2>
        <Link
          to="/admin/tasks/new"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Create New Task
        </Link>
      </div>

      {error && (
        <div className="bg-red-900 text-red-300 p-4 mb-4 rounded-md">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="p-6 text-center text-gray-400">No tasks found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">
                  Points
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{task.title}</td>
                  <td className="py-3 px-4 text-white">{task.points}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-md ${
                        task.isActive
                          ? "bg-green-900 text-green-300"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {task.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/tasks/${task._id}/edit`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Edit
                      </Link>
                      {showDeleteConfirm === task._id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">
                            Confirm?
                          </span>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(task._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
