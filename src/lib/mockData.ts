export interface Habit {
    id: string;
    name: string;
    completed: boolean;
  }
  
  export interface DailyData {
    date: string;
    completionRate: number;
    habits: Habit[];
  }
  
  export interface Friend {
    id: string;
    name: string;
    color: string;
    dailyData: {
      date: string;
      completionRate: number;
    }[];
  }
  
  export interface MockData {
    dailyData: DailyData[];
    friends: Friend[];
  }
  
  const HABIT_NAMES = [
    'EXERCISE_30MIN',
    'READ_20PAGES',
    'MEDITATE_10MIN',
    'NO_SOCIAL_MEDIA',
    'SLEEP_BEFORE_23:00',
  ];
  
  const FRIEND_NAMES = [
    { name: 'ALEX_K', color: '#666666' },
    { name: 'MORGAN_T', color: '#999999' },
    { name: 'JORDAN_L', color: '#AAAAAA' },
  ];
  
  function generateDateRange(days: number): string[] {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0] ?? '');
    }
    
    return dates;
  }
  
  function generateHabitsForDay(date: string, baseRate: number): Habit[] {
    // Add some randomness but tend toward the base completion rate
    const variance = 0.2;
    const adjustedRate = Math.max(0, Math.min(1, baseRate + (Math.random() - 0.5) * variance));
    
    return HABIT_NAMES.map((name, index) => ({
      id: `${date}-habit-${index}`,
      name,
      completed: Math.random() < adjustedRate,
    }));
  }
  
  function calculateCompletionRate(habits: Habit[]): number {
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  }
  
  export function generateMockData(): MockData {
    const dates = generateDateRange(90);
    
    // Generate main user data with improving trend
    const dailyData: DailyData[] = dates.map((date, index) => {
      // Start at 40% and improve to 80% over 90 days with some variation
      const progressRate = 0.4 + (index / dates.length) * 0.4;
      const habits = generateHabitsForDay(date, progressRate);
      
      return {
        date,
        completionRate: calculateCompletionRate(habits),
        habits,
      };
    });
  
    // Generate friends data with different patterns
    const friends: Friend[] = FRIEND_NAMES.map((friend, friendIndex) => {
      // Each friend has a different performance pattern
      const patterns = [
        // Consistent high performer
        (index: number) => 0.75 + Math.random() * 0.15,
        // Improving gradually
        (index: number) => 0.5 + (index / dates.length) * 0.3,
        // Volatile performer
        (index: number) => 0.4 + Math.random() * 0.4,
      ];
      
      const pattern = patterns[friendIndex] 
      
      return {
        id: `friend-${friendIndex}`,
        name: friend.name,
        color: friend.color,
        dailyData: dates.map((date, index) => {
          const habits = generateHabitsForDay(date, pattern ? pattern(index) : 0.5);
          return {
            date,
            completionRate: calculateCompletionRate(habits),
          };
        }),
      };
    });
  
    return {
      dailyData,
      friends,
    };
  }