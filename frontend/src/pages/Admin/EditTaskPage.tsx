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
    return <div className="p-8 text-center text-gray-300">Loading task...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-900 text-red-300 p-4 rounded-md mb-6">
          {error}
        </div>
        <button
          onClick={() => navigate("/admin/tasks")}
          className="bg-gray-800 px-5 py-2 rounded-md hover:bg-gray-700 text-white transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-8">
        <div className="bg-yellow-900 text-yellow-300 p-4 rounded-md mb-6">
          Task not found
        </div>
        <button
          onClick={() => navigate("/admin/tasks")}
          className="bg-gray-800 px-5 py-2 rounded-md hover:bg-gray-700 text-white transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Edit Task</h1>
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
        <TaskForm initialTask={task} isEditing={true} />
      </div>
    </div>
  );
};

export default EditTaskPage;
