import { useEffect, useState } from "react";
import { LINK } from "../../constant";
import React from "react";
interface Task {
  _id: string;
  title: string;
  description: string;
  points: number;
  createdBy?: { username: string };
  createdAt: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${LINK}/api/tasks`);
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Available Tasks
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded-lg bg-gray-100 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Points:</strong> {task.points}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <strong>Created By:</strong>{" "}
                {task.createdBy?.username || "Unknown"}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
