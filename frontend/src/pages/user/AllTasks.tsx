import { useQuery } from "@tanstack/react-query";
import { LINK } from "../../constant";
import React from "react";
type taskType = {
  _id: string;
  title: string;
  description: string;
  points: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

const getAllTasks = async (): Promise<taskType[]> => {
  const response = await fetch(`h${LINK}/api/tasks`);
  return await response.json();
};

const AllTasks = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["AllTasks"],
    queryFn: getAllTasks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div>All Tasks</div>
      <p>show All the Tasks </p>
      <div>
        {Array.isArray(data) && data?.length > 0 ? (
          data?.map((task: taskType) => (
            <div
              key={task._id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>title :{task.title}</p>
              <p>description :{task.description}</p>
              <p>status : {task.isActive ? "Active" : "Not Active"}</p>
              <p>Last updated at : {task.updatedAt.toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No Tasks Found</p>
        )}
      </div>
    </>
  );
};

export default AllTasks;
