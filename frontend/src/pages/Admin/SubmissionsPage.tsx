import React from "react";
import SubmissionList from "../../components/admin/SubmissionList";

const SubmissionsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Submissions</h1>
      <SubmissionList />
    </div>
  );
};
export default SubmissionsPage;
