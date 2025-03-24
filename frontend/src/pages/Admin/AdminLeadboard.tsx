import { useEffect, useState } from "react";
import { LINK } from "../../constant";

interface User {
  username: string;
  totalPoints: number;
}

export default function AdminLeaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${LINK}/api/leaderboard`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data: User[] = await response.json();

        // Sort users by highest points first
        data.sort((a, b) => b.totalPoints - a.totalPoints);
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
          {users.map((user, index) => {
            let bgColor = "bg-gray-100"; // Default background

            if (index === 0) bgColor = "bg-yellow-400"; // 🥇 Gold (1st place)
            else if (index === 1)
              bgColor = "bg-gray-300"; // 🥈 Silver (2nd place)
            else if (index === 2) bgColor = "bg-orange-400"; // 🥉 Bronze (3rd place)

            return (
              <li
                key={index}
                className={`flex justify-between p-3 rounded-lg font-medium ${bgColor}`}
              >
                <span>
                  #{index + 1} {user.username}
                </span>
                <span className="font-bold text-blue-600">
                  {user.totalPoints} pts
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
