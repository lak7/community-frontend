import { useEffect, useState } from "react";
import { LINK } from "../../constant";
import React from "react";
interface User {
  username: string;
  totalPoints: number;
}

export default function AdminLeadboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${LINK}/api/leaderboard`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data = await response.json();
        setUsers(data);
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

      {!loading && !error && (
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex justify-between p-3 bg-gray-100 rounded-lg"
            >
              <span className="font-medium">{user.username}</span>
              <span className="font-bold text-blue-600">
                {user.totalPoints} pts
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
