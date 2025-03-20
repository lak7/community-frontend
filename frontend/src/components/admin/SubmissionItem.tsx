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

  const handleApprove = async () => {
    setLoading(true);
    try {
      const updatedSubmission = await approveSubmission(
        submission._id,
        feedback
      );
      onSubmissionUpdated(updatedSubmission);
    } catch (err) {
      setError("Failed to approve submission");
      console.error(err);
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

  const submissionDate = new Date(submission.submittedAt).toLocaleDateString();

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {submission.userDetails?.name || "Unknown User"} -{" "}
            {submission.taskDetails?.title || "Unknown Task"}
          </h3>
          <p className="text-sm text-gray-500">Submitted on {submissionDate}</p>
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
          <div className="bg-gray-50 p-3 rounded mb-4">
            <h4 className="font-medium mb-2">Submission Content:</h4>
            <div className="whitespace-pre-wrap">
              {submission.submissionContent}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1">
              Feedback (required for rejection):
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full p-2 border rounded"
              placeholder="Provide feedback to the user..."
            />
          </div>

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
