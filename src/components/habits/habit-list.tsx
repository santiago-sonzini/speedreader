import { Habit } from "@/lib/mockData";

interface HabitChecklistProps {
  habits: Habit[];
  date: string;
  onToggle: (habitId: string) => void;
}

export default function HabitChecklist({ habits, date, onToggle }: HabitChecklistProps) {
  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div>
      {/* Status Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-8 border border-gray-300 dark:border-gray-700 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-black dark:bg-white transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="text-xs uppercase tracking-wider tabular-nums">
          {completedCount}/{totalCount}
          <span className="opacity-50 ml-2">[{percentage}%]</span>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-1">
        {habits.map((habit) => (
          <label
            key={habit.id}
            className="flex items-center gap-4 p-3 border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="relative w-5 h-5 flex-shrink-0">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => onToggle(habit.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 transition-all ${
                  habit.completed
                    ? 'bg-black dark:bg-white border-black dark:border-white'
                    : 'bg-transparent border-gray-300 dark:border-gray-700'
                }`}
              >
                {habit.completed && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-white dark:text-black"
                  >
                    <polyline points="4,10 8,14 16,6" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span
                className={`text-sm uppercase tracking-wider transition-opacity ${
                  habit.completed ? 'opacity-50' : 'opacity-100'
                }`}
              >
                {habit.name}
              </span>
              <span className="text-xs opacity-30 uppercase tracking-wider">
                {date}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}