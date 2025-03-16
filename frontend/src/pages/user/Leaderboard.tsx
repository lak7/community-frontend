import { useEffect, useState } from "react";
import { LINK } from "../../constant";
import React from "react";

interface User {
  _id: string;
  username: string;
  totalPoints: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${LINK}/api/leaderboard`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data: User[] = await response.json();
        setUsers(data);

        // Get logged-in user ID from localStorage
        const userId = localStorage.getItem("userId");

        if (userId) {
          const foundUser = data.find((user) => user._id === userId);
          if (foundUser) setLoggedInUser(foundUser);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Leaderboard
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show logged-in user at the top if they exist */}
      {loggedInUser && (
        <div className="p-4 bg-yellow-200 rounded-lg mb-4 text-center">
          <p className="text-lg font-bold">Your Rank</p>
          <p className="text-xl font-medium">{loggedInUser.username}</p>
          <p className="text-xl font-bold text-blue-600">
            {loggedInUser.totalPoints} pts
          </p>
        </div>
      )}

      {!loading && !error && (
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className={`flex justify-between p-3 rounded-lg ${
                loggedInUser?._id === user._id
                  ? "bg-yellow-300 font-bold"
                  : "bg-gray-100"
              }`}
            >
              <span>{user.username}</span>
              <span>{user.totalPoints} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
