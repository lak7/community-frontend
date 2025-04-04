import React from "react";
import SubmissionList from "../../components/admin/SubmissionList";

const SubmissionsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">
        Pending Submissions
      </h1>
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <SubmissionList />
      </div>
    </div>
  );
};
export default SubmissionsPage;
