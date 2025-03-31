import { useEffect, useState } from "react";
import { LINK } from "../../constant";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  points: number;
  createdBy?: { username: string };
  createdAt: string;
}

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
    setImage(null); // Reset image when selecting new task
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Basic validation
      if (!file.type.match("image.*")) {
        alert("Please select an image file (JPEG, PNG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setImage(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${LINK}/api/upload/image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        throw new Error(`Upload failed: ${error.message}`);
      } else {
        throw new Error("Upload failed: Unknown error");
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedTask || !image) {
      alert("Please select a task and upload an image");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload image (already working)
      const imageUrl = await uploadImage(image);

      // 2. Submit task - cookies will auto-send
      const submissionResponse = await fetch(
        `${LINK}/api/user/tasks/${selectedTask._id}/complete`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );

      if (!submissionResponse.ok) {
        const errorData = await submissionResponse.json();
        throw new Error(errorData.message || "Failed to submit task");
      }

      // 3. On success - show alert and redirect
      alert("Task submitted successfully! Redirecting to dashboard...");
      navigate("/auth/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Available Tasks
      </h2>

      {loading && <p className="text-center">Loading tasks...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded-lg bg-gray-100 shadow-sm cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handleTaskClick(task)}
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600 line-clamp-2">{task.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {task.points} pts
                </span>
                <span className="text-sm text-gray-500">
                  {task.createdBy?.username || "System"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Submission Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">{selectedTask.title}</h2>
            <p className="text-gray-600 mb-4">{selectedTask.description}</p>
            <p className="mb-4">
              <span className="font-semibold">Points:</span>{" "}
              {selectedTask.points}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proof (Image)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        JPEG, PNG (MAX. 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!image || uploading}
                className={`px-4 py-2 rounded-md text-white ${
                  !image || uploading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Task"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
