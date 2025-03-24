import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/admin/TaskForm";
import { Task } from "../../interfaces/Task";
import { LINK } from "../../constant";

const EditTaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${LINK}/api/tasks/${taskId}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError("Failed to load task. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  if (loading) {
    return <div className="p-6 text-center">Loading task...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        <button
          onClick={() => navigate("/admin/tasks")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4">
          Task not found
        </div>
        <button
          onClick={() => navigate("/admin/tasks")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <TaskForm initialTask={task} isEditing={true} />
    </div>
  );
};

export default EditTaskPage;
