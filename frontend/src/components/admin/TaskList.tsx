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

  if (loading) return <div className="text-center p-4">Loading tasks...</div>;

  return (
    <div className="bg-white rounded shadow">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Tasks</h2>
        <Link
          to="/admin/tasks/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Task
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 m-4 rounded">{error}</div>
      )}

      {tasks.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No tasks found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4">{task.points}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        task.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.isActive ? "InActive" : "active"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/tasks/${task._id}/edit`}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      {showDeleteConfirm === task._id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Confirm?</span>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-500 hover:underline"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-gray-500 hover:underline"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(task._id)}
                          className="text-red-500 hover:underline"
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
