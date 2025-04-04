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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Leaderboard</h1>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        {loading && <p className="text-gray-300 text-center">Loading...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        {!loading && !error && (
          <ul className="space-y-3">
            {users.map((user, index) => {
              let rankStyles = "";

              if (index === 0)
                rankStyles = "border-l-4 border-yellow-500"; // Gold (1st place)
              else if (index === 1)
                rankStyles = "border-l-4 border-gray-400"; // Silver (2nd place)
              else if (index === 2) rankStyles = "border-l-4 border-amber-600"; // Bronze (3rd place)

              return (
                <li
                  key={index}
                  className={`flex justify-between p-4 bg-gray-800 rounded-md ${rankStyles}`}
                >
                  <span className="text-white">
                    <span className="inline-block w-8 text-gray-400">
                      #{index + 1}
                    </span>
                    {user.username}
                  </span>
                  <span className="font-bold text-gray-300">
                    {user.totalPoints} pts
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
