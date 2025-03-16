import { useQuery } from "@tanstack/react-query";
import React from "react";
import { LINK } from "../../constant";

type userType = {
  _id: string;
  username: string;
  totalPoints: number;
};

const getUsers = async (): Promise<userType[]> => {
  const response = await fetch(`${LINK}/api/leaderboard`);
  return await response.json();
};

const Leaderboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["points"],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div>Leaderboard</div>
      <p>show the rank of the user and top 10 participant </p>
      {Array.isArray(data) && data?.length > 0 ? (
        <div>
          {/* user points : {(data?.find((user) => user.username === usernameOfUser).totalPoints} */}
          {data?.map((user: userType) => (
            <div
              key={user._id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>username :{user.username}</p>
              <p>Total Points :{user.totalPoints}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Ranks Found</p>
      )}
    </>
  );
};

export default Leaderboard;
