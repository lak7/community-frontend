// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Task, Submission } from "../../types";
// import {
//   fetchTasks,
//   createTask,
//   updateTask,
//   deleteTask,
//   fetchPendingSubmissions,
//   approveSubmission,
//   rejectSubmission,
// } from "../../api";
// import React from "react";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     points: 0,
//   });
//   const [editTask, setEditTask] = useState<Task | null>(null);

//   useEffect(() => {
//     // Check if the user is logged in
//     // const checkAuth = async () => {
//     //   try {
//     //     const res = await fetch("/api/auth/me", { credentials: "include" });
//     //     if (!res.ok) throw new Error("Not authenticated");

//     //     const data = await res.json();
//     //     if (!data.isAdmin) {
//     //       navigate("/login"); // Redirect non-admin users
//     //     }
//     //   } catch (error) {
//     //     navigate("/login"); // Redirect if authentication fails
//     //   }
//     // };

//     // checkAuth();
//     loadTasks();
//     loadSubmissions();
//   }, [navigate]);
//   const loadTasks = async () => {
//     const res = await fetchTasks();
//     setTasks(res.data);
//   };

//   const loadSubmissions = async () => {
//     const res = await fetchPendingSubmissions();
//     setSubmissions(res.data);
//   };

//   const handleCreateTask = async () => {
//     await createTask(newTask);
//     setNewTask({ title: "", description: "", points: 0 });
//     loadTasks();
//   };

//   const handleUpdateTask = async () => {
//     if (editTask) {
//       await updateTask(editTask._id, editTask);
//       setEditTask(null);
//       loadTasks();
//     }
//   };

//   const handleDeleteTask = async (taskId: string) => {
//     await deleteTask(taskId);
//     loadTasks();
//   };

//   const handleApproveSubmission = async (submissionId: string) => {
//     await approveSubmission(submissionId);
//     loadSubmissions();
//   };

//   const handleRejectSubmission = async (submissionId: string) => {
//     await rejectSubmission(submissionId);
//     loadSubmissions();
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>

//       {/* Task Management */}
//       <div className="bg-white p-4 shadow rounded mb-4 max-w-md mx-auto">
//         <h2 className="text-xl font-bold mb-2">Manage Tasks</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full p-2 border rounded mb-2"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//         />
//         <textarea
//           placeholder="Description"
//           className="w-full p-2 border rounded mb-2"
//           value={newTask.description}
//           onChange={(e) =>
//             setNewTask({ ...newTask, description: e.target.value })
//           }
//         />
//         <input
//           type="number"
//           placeholder="Points"
//           className="w-full p-2 border rounded mb-2"
//           value={newTask.points}
//           onChange={(e) =>
//             setNewTask({ ...newTask, points: Number(e.target.value) })
//           }
//         />
//         <button
//           onClick={handleCreateTask}
//           className="bg-blue-500 text-white p-2 w-full rounded"
//         >
//           Add Task
//         </button>
//       </div>

//       {/* Task List */}
//       <div className="max-w-md mx-auto">
//         {tasks.map((task) => (
//           <div key={task._id} className="bg-white p-4 shadow rounded mb-2">
//             <h3 className="text-lg font-bold">
//               {task.title} ({task.points} pts)
//             </h3>
//             <p className="text-gray-600">{task.description}</p>
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={() => setEditTask(task)}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteTask(task._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Submission Review */}
//       <div className="max-w-md mx-auto mt-6">
//         <h2 className="text-xl font-bold mb-2">Pending Submissions</h2>
//         {submissions.map((submission) => (
//           <div
//             key={submission._id}
//             className="bg-white p-4 shadow rounded mb-2"
//           >
//             <p className="font-bold">{submission.user.username}</p>
//             <p>
//               {submission.task.title} ({submission.task.points} pts)
//             </p>
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={() => handleApproveSubmission(submission._id)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() => handleRejectSubmission(submission._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Tasks</h2>
          <p className="text-gray-600 mb-4">
            Manage tasks for users to complete
          </p>
          <Link
            to="/admin/tasks"
            className="bg-blue-500 text-white px-4 py-2 rounded block text-center hover:bg-blue-600"
          >
            View Tasks
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Submissions</h2>
          <p className="text-gray-600 mb-4">
            Review and approve user submissions
          </p>
          <Link
            to="/admin/submissions"
            className="bg-green-500 text-white px-4 py-2 rounded block text-center hover:bg-green-600"
          >
            View Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
