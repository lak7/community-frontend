import { useEffect, useState } from "react";
import { LINK } from "../../constant";

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

        let data: User[] = await response.json();

        // Sort users by highest points
        data.sort((a, b) => b.totalPoints - a.totalPoints);
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
        <div className="p-4 bg-yellow-200 rounded-lg mb-4 text-center border-2 border-black shadow-lg">
          <p className="text-lg font-bold">Your Rank</p>
          <p className="text-xl font-medium">{loggedInUser.username}</p>
          <p className="text-xl font-bold text-blue-600">
            {loggedInUser.totalPoints} pts
          </p>
        </div>
      )}

      {!loading && !error && (
        <ul className="space-y-4">
          {users.map((user, index) => {
            let bgColor = "bg-gray-100"; // Default background

            // Apply special colors for the top 3 users
            if (index === 0) bgColor = "bg-yellow-400"; // Gold 🥇
            else if (index === 1) bgColor = "bg-gray-300"; // Silver 🥈
            else if (index === 2) bgColor = "bg-orange-400"; // Bronze 🥉

            // Highlight logged-in user if they are not in the top 3
            if (loggedInUser?._id === user._id && index >= 3) {
              bgColor = "bg-yellow-300 font-bold";
            }

            return (
              <li
                key={user._id}
                className={`flex justify-between p-3 rounded-lg font-medium ${bgColor}`}
              >
                <span>
                  #{index + 1} {user.username}
                </span>
                <span>{user.totalPoints} pts</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
