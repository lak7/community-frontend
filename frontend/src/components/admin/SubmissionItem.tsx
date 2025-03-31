import React, { useState } from "react";
import { Submission } from "../../interfaces/Submission";
import { approveSubmission, rejectSubmission } from "../../api/adminApi";

interface SubmissionItemProps {
  submission: Submission;
  onSubmissionUpdated: (submission: Submission) => void;
}

const SubmissionItem: React.FC<SubmissionItemProps> = ({
  submission,
  onSubmissionUpdated,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log("submission:", submission);
  // console.log("Submitted At:", submission.completedAt);

  const handleApprove = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Approving submission:", submission._id);
      const updatedSubmission = await approveSubmission(
        submission._id,
        feedback
      );
      console.log("Approval Response:", updatedSubmission);

      onSubmissionUpdated(updatedSubmission);
    } catch (err: any) {
      console.error("Approval Error:", err);
      setError(err?.message || "Failed to approve submission");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      setError("Feedback is required when rejecting a submission");
      return;
    }

    setLoading(true);
    try {
      const updatedSubmission = await rejectSubmission(
        submission._id,
        feedback
      );
      onSubmissionUpdated(updatedSubmission);
    } catch (err) {
      setError("Failed to reject submission");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submissionDate = submission.completedAt
    ? new Date(submission.completedAt).toLocaleString()
    : "Date Not Available";

  return (
    <div className="p-4 text-black">
      {" "}
      {/* Added text-black */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-black">
            {submission.user?.username || "Unknown User"} -{" "}
            {submission.task?.title || "Unknown Task"}
          </h3>

          <p className="text-sm text-black">Submitted on {submissionDate}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:underline"
        >
          {expanded ? "Hide" : "View"}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          {/* Display Submission Image */}
          {submission.image && (
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-black">Submitted Image:</h4>
              <img
                src={submission.image}
                alt="Submission"
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Submission Content */}
          <div className="bg-gray-50 p-3 rounded mb-4">
            <h4 className="font-medium mb-2 text-black">Submission Content:</h4>
            <div className="whitespace-pre-wrap text-black">
              {submission.submissionContent}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Feedback Section */}
          <div className="mb-4">
            <label className="block mb-1 text-black">
              Feedback (required for rejection):
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full p-2 border rounded text-black"
              placeholder="Provide feedback to the user..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Approve"}
            </button>
            <button
              onClick={handleReject}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Reject"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionItem;
