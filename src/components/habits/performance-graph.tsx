import { DailyData, Friend } from '@/lib/mockData';
import { useMemo } from 'react';

interface PerformanceGraphProps {
  userData: DailyData[];
  friendsData: Friend[];
  selectedFriends: Set<string>;
  timeRange: number;
}

export default function PerformanceGraph({
  userData,
  friendsData,
  selectedFriends,
  timeRange,
}: PerformanceGraphProps) {
  const filteredData = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeRange);

    return userData.filter((d) => {
      const date = new Date(d.date);
      return date >= startDate && date <= endDate;
    });
  }, [userData, timeRange]);

  const selectedFriendsData = useMemo(() => {
    return friendsData
      .filter((f) => selectedFriends.has(f.id))
      .map((friend) => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeRange);

        return {
          ...friend,
          dailyData: friend.dailyData.filter((d) => {
            const date = new Date(d.date);
            return date >= startDate && date <= endDate;
          }),
        };
      });
  }, [friendsData, selectedFriends, timeRange]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-black dark:bg-white" />
          <span>YOU</span>
        </div>
        {selectedFriendsData.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2">
            <div
              className="w-8 h-0.5"
              style={{ backgroundColor: friend.color }}
            />
            <span style={{ color: friend.color }}>{friend.name}</span>
          </div>
        ))}
      </div>

      {/* Graph */}
      <div className="border border-gray-300 dark:border-gray-700">
        <LineChart
          userData={filteredData}
          friendsData={selectedFriendsData}
          timeRange={timeRange}
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBlock
          label="CURRENT_STREAK"
          value={calculateStreak(filteredData)}
          unit="DAYS"
        />
        <StatBlock
          label="AVG_COMPLETION"
          value={calculateAverage(filteredData)}
          unit="%"
        />
        <StatBlock
          label="BEST_DAY"
          value={calculateBest(filteredData)}
          unit="%"
        />
        <StatBlock
          label="TOTAL_DAYS"
          value={filteredData.length}
          unit="TRACKED"
        />
      </div>
    </div>
  );
}

function LineChart({
  userData,
  friendsData,
  timeRange,
}: {
  userData: DailyData[];
  friendsData: Friend[];
  timeRange: number;
}) {
  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Generate grid lines
  const gridLines = [0, 25, 50, 75, 100];

  // Calculate points for user data
  const userPoints = userData.map((d, i) => {
    const x = padding.left + (i / Math.max(userData.length - 1, 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.completionRate / 100) * chartHeight;
    return { x, y, rate: d.completionRate, date: d.date };
  });

  // Calculate points for friends data
  const friendsPoints = friendsData.map((friend) => {
    return friend.dailyData.map((d, i) => {
      const x = padding.left + (i / Math.max(friend.dailyData.length - 1, 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.completionRate / 100) * chartHeight;
      return { x, y, rate: d.completionRate, date: d.date };
    });
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      style={{ maxHeight: '400px' }}
    >
      {/* Background Grid */}
      {gridLines.map((value) => {
        const y = padding.top + chartHeight - (value / 100) * chartHeight;
        return (
          <g key={value}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-10"
            />
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-[8px] fill-current opacity-50 font-mono"
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {userPoints
        .filter((_, i) => {
          // Show fewer labels on mobile
          if (timeRange === 90) return i % 15 === 0;
          if (timeRange === 30) return i % 5 === 0;
          return i % 2 === 0;
        })
        .map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className="text-[8px] fill-current opacity-50 font-mono"
          >
            {new Date(point.date).getDate()}
          </text>
        ))}

      {/* User line */}
      {userPoints.length > 1 && (
        <polyline
          points={userPoints.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-black dark:text-white"
        />
      )}

      {/* User points */}
      {userPoints.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="3"
          className="fill-black dark:fill-white"
        />
      ))}

      {/* Friends lines */}
      {friendsData.map((friend, friendIndex) => {
        const points = friendsPoints[friendIndex] ?? [];
        if (points.length < 2) return null;

        return (
          <g key={friend.id}>
            <polyline
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={friend.color}
              strokeWidth="2"
            />
            {points.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="2"
                fill={friend.color}
              />
            ))}
          </g>
        );
      })}

      {/* Axis lines */}
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-30"
      />
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-30"
      />
    </svg>
  );
}

function StatBlock({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 p-4">
      <div className="text-xs uppercase tracking-wider opacity-50 mb-2">
        {label}
      </div>
      <div className="text-2xl font-mono tabular-nums mb-1">{value}</div>
      <div className="text-xs uppercase tracking-wider opacity-30">{unit}</div>
    </div>
  );
}

function calculateStreak(data: DailyData[]): number {
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    const dataItem = data[i] as DailyData
    if (dataItem.completionRate >= 80) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function calculateAverage(data: DailyData[]): number {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, d) => acc + d.completionRate, 0);
  return Math.round(sum / data.length);
}

function calculateBest(data: DailyData[]): number {
  if (data.length === 0) return 0;
  return Math.max(...data.map((d) => d.completionRate));
}