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
    <div>
      {error && (
        <div className="bg-red-900 text-red-300 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-300">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-300">Points</label>
          <input
            type="number"
            name="points"
            value={task.points}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="isActive"
              checked={task.isActive}
              onChange={handleChange}
              className="mr-3 h-5 w-5 rounded border-gray-700 bg-gray-800"
            />
            Active
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-700 transition-colors"
          >
            {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/tasks")}
            className="bg-gray-700 text-gray-300 px-5 py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;
