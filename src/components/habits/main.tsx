'use client';

import FriendsSelector from '@/components/habits/friend-selector';
import HabitChecklist from '@/components/habits/habit-list';
import PerformanceGraph from '@/components/habits/performance-graph';
import Header from '@/components/layout/header';
import { DailyData, generateMockData } from '@/lib/mockData';
import { useState, useMemo } from 'react';

type TimeRange = '7' | '30' | '90';

export default function HabitDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0] ?? '');
  const [timeRange, setTimeRange] = useState<TimeRange>('7');
  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(new Set());
  
  const mockData = useMemo(() => generateMockData(), []);
  
  const todayData = mockData.dailyData.find(d => d.date === selectedDate);
  const habits = todayData?.habits || [];

  const handleHabitToggle = (habitId: string) => {
    const updatedHabits = habits.map(h => 
      h.id === habitId ? { ...h, completed: !h.completed } : h
    );
    
    // Update mock data in place
    const dayIndex = mockData.dailyData.findIndex(d => d.date === selectedDate);
    if (dayIndex !== -1) {
        const item = mockData.dailyData[dayIndex] as DailyData
      item.habits = updatedHabits;
      item.completionRate = 
        (updatedHabits.filter(h => h.completed).length / updatedHabits.length) * 100;
    }
  };


  const handleAddHabit = (name: string) => {
    
    console.log('handleAddHabit', name);
  };

  const handleFriendToggle = (friendId: string) => {
    const newSelected = new Set(selectedFriends);
    if (newSelected.has(friendId)) {
      newSelected.delete(friendId);
    } else {
      newSelected.add(friendId);
    }
    setSelectedFriends(newSelected);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono">
      {/* Header */}
      <Header name='Habits' />
      <main className="max-w-7xl mx-auto mt-16 p-4 space-y-8">
        {/* SECTION 1: HABIT CHECKLIST */}
        <section className="border border-gray-300 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs uppercase tracking-wider opacity-50">
              DAILY_CHECKLIST
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border border-gray-300 dark:border-gray-700 px-3 py-1 text-xs uppercase font-mono focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>
          <HabitChecklist
            onAddHabit={handleAddHabit}
            habits={habits}
            date={selectedDate}
            onToggle={handleHabitToggle}
          />
        </section>

        {/* SECTION 2: PERFORMANCE GRAPH */}
        <section className="border border-gray-300 dark:border-gray-700 p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xs uppercase tracking-wider opacity-50">
              PERFORMANCE_METRICS
            </h2>
            <div className="flex gap-2">
              {(['7', '30', '90'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
                    timeRange === range
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-transparent border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                  }`}
                >
                  LAST_{range}_DAYS
                </button>
              ))}
            </div>
          </div>
          <PerformanceGraph
            userData={mockData.dailyData}
            friendsData={mockData.friends}
            selectedFriends={selectedFriends}
            timeRange={parseInt(timeRange)}
          />
        </section>

        {/* SECTION 3: FRIENDS COMPARISON */}
        <section className="border border-gray-300 dark:border-gray-700 p-6">
          <h2 className="text-xs uppercase tracking-wider opacity-50 mb-6">
            PEER_COMPARISON
          </h2>
          <FriendsSelector
            friends={mockData.friends}
            selectedFriends={selectedFriends}
            onToggle={handleFriendToggle}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-700 mt-12 p-4">
        <div className="max-w-7xl mx-auto text-xs uppercase tracking-wider opacity-30 text-center">
          SYSTEM_STATUS: OPERATIONAL
        </div>
      </footer>
    </div>
  );
}