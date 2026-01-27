import { Friend } from '@/lib/mockData';

interface FriendsSelectorProps {
  friends: Friend[];
  selectedFriends: Set<string>;
  onToggle: (friendId: string) => void;
}

export default function FriendsSelector({
  friends,
  selectedFriends,
  onToggle,
}: FriendsSelectorProps) {
  return (
    <div className="space-y-1">
      {friends.map((friend) => {
        const isSelected = selectedFriends.has(friend.id);
        const avgCompletion = Math.round(
          friend.dailyData.reduce((acc, d) => acc + d.completionRate, 0) /
            friend.dailyData.length
        );

        return (
          <label
            key={friend.id}
            className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="relative w-5 h-5 flex-shrink-0">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(friend.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 transition-all ${
                  isSelected
                    ? 'border-black dark:border-white'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                style={{
                  backgroundColor: isSelected ? friend.color : 'transparent',
                }}
              >
                {isSelected && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="4,10 8,14 16,6" />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm uppercase tracking-wider">
                  {friend.name}
                </span>
                <div
                  className="w-8 h-0.5"
                  style={{ backgroundColor: friend.color }}
                />
              </div>

              <div className="flex items-center gap-6">
                {/* Average Completion */}
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider opacity-30 mb-1">
                    AVG
                  </div>
                  <div className="text-sm font-mono tabular-nums">
                    {avgCompletion}%
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="w-32 h-6 border border-gray-300 dark:border-gray-700 relative overflow-hidden">
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      backgroundColor: friend.color,
                      width: `${avgCompletion}%`,
                    }}
                  />
                </div>

                {/* Status Indicator */}
                <div
                  className={`w-2 h-2 ${
                    isSelected
                      ? 'bg-black dark:bg-white'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}