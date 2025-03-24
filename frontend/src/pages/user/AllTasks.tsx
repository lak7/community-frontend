// import { useEffect, useState } from "react";
// import { LINK } from "../../constant";
// import React from "react";
// interface Task {
//   _id: string;
//   title: string;
//   description: string;
//   points: number;
//   createdBy?: { username: string };
//   createdAt: string;
// }

// export default function Tasks() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch(`${LINK}/api/tasks`);
//         if (!response.ok) throw new Error("Failed to fetch tasks");

//         const data = await response.json();
//         setTasks(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Available Tasks
//       </h2>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && (
//         <ul className="space-y-4">
//           {tasks.map((task) => (
//             <li
//               key={task._id}
//               className="p-4 border rounded-lg bg-gray-100 shadow-sm"
//             >
//               <h3 className="text-xl font-semibold">{task.title}</h3>
//               <p className="text-gray-600">{task.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 <strong>Points:</strong> {task.points}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 <strong>Created By:</strong>{" "}
//                 {task.createdBy?.username || "Unknown"}
//               </p>
//               <p className="text-sm text-gray-400">
//                 {new Date(task.createdAt).toLocaleDateString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { LINK } from "../../constant";
import React from "react";
// import { Task } from "../../interfaces/Task";
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [image, setImage] = useState<File | null>(null);
  // const [status, setStatus] = useState("pending");
  const status  = "pending"

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

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTask || !image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("status", status);
    formData.append("taskId", selectedTask._id);

    try {
      const response = await fetch(
        `${LINK}/api/user/tasks/${selectedTask._id}/complete`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to submit task");

      alert("Task submitted successfully!");
      setSelectedTask(null);
      setImage(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting task.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Available Tasks
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded-lg bg-gray-100 shadow-sm cursor-pointer hover:bg-gray-200"
              onClick={() => handleTaskClick(task)}
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
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
            <p className="text-gray-600">{selectedTask.description}</p>

            <label className="block mt-4">
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 border p-2 w-full rounded-lg"
              />
            </label>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={handleSubmit}
            >
              Submit Task
            </button>

            <button
              className="mt-2 text-red-500 underline w-full text-center"
              onClick={() => setSelectedTask(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
