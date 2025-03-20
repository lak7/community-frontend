import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, updateTask } from "../../api/adminApi";
import { Task } from "../../interfaces/Task";

interface TaskFormProps {
  initialTask?: Task;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    points: initialTask?.points || 0,
    isActive: initialTask?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setTask({
        ...task,
        [name]: checkbox.checked,
      });
    } else {
      setTask({
        ...task,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing && initialTask) {
        await updateTask(initialTask._id, task);
      } else {
        await createTask(task);
      }
      navigate("/admin/tasks");
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Task" : "Create New Task"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Points</label>
          <input
            type="number"
            name="points"
            value={task.points}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={task.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Active
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/tasks")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;
