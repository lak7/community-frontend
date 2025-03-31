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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="glass-container p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8 neon-text">
            Leaderboard
          </h2>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-white p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Show logged-in user at the top if they exist */}
          {loggedInUser && (
            <div className="p-6 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg mb-6 border border-indigo-500/50 shadow-lg">
              <p className="text-gray-300 mb-2 text-center">Your Rank</p>
              <h3 className="text-xl font-medium text-center neon-text">
                {loggedInUser.username}
              </h3>
              <p className="text-2xl font-bold text-center text-blue-400 mt-2">
                {loggedInUser.totalPoints} points
              </p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="space-y-3">
              {users.map((user, index) => {
                // Apply special classes for the top 3 users
                let cardClasses =
                  "flex justify-between p-4 rounded-lg transition-all";
                let rankBadge = "";
                let pointsClass = "text-gray-300";

                if (index === 0) {
                  cardClasses +=
                    " bg-gradient-to-r from-yellow-900/20 to-yellow-700/20 border border-yellow-600/50"; // Gold
                  rankBadge = "🥇";
                  pointsClass = "text-yellow-400 font-bold";
                } else if (index === 1) {
                  cardClasses +=
                    " bg-gradient-to-r from-gray-800/30 to-gray-600/30 border border-gray-500/50"; // Silver
                  rankBadge = "🥈";
                  pointsClass = "text-gray-300 font-bold";
                } else if (index === 2) {
                  cardClasses +=
                    " bg-gradient-to-r from-amber-900/20 to-amber-700/20 border border-amber-700/50"; // Bronze
                  rankBadge = "🥉";
                  pointsClass = "text-amber-400 font-bold";
                } else {
                  cardClasses += " bg-gray-800/20 border border-gray-700/30";
                }

                // Highlight logged-in user
                if (loggedInUser?._id === user._id) {
                  cardClasses +=
                    " ring-2 ring-blue-500/50 ring-offset-2 ring-offset-transparent";
                }

                return (
                  <div key={user._id} className={cardClasses}>
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center text-xl font-bold mr-3">
                        {rankBadge || `#${index + 1}`}
                      </div>
                      <span className="font-medium">{user.username}</span>
                    </div>
                    <span className={pointsClass}>{user.totalPoints} pts</span>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No users found. Be the first to join the leaderboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
