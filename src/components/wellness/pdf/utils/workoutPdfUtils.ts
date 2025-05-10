
import { FormData } from '../../types';

export const getDifficultyLevel = (exerciseFrequency: string): string => {
  if (exerciseFrequency === '5+') return 'Advanced';
  if (exerciseFrequency === '3-4') return 'Intermediate';
  return 'Beginner';
};

export const getDailyFocusArea = (dayNumber: number, fitnessGoal: string): string => {
  const dayInWeek = dayNumber % 7;
  
  switch (dayInWeek) {
    case 1: return "Core & Stability";
    case 2: return "Mobility & Flexibility";
    case 3: return "Strength & Power";
    case 4: return "Yoga & Balance";
    case 5: return "Functional Movement";
    case 6: return fitnessGoal === 'weight-loss' ? "HIIT & Cardio" : "Endurance";
    case 0: return "Recovery & Regeneration"; // Day 7, 14, etc.
    default: return "General Fitness";
  }
};

export const getEstimatedCaloriesBurned = (isRestDay: boolean, exerciseFrequency: string): number => {
  if (isRestDay) return 100;
  if (exerciseFrequency === '5+') return 350;
  if (exerciseFrequency === '3-4') return 280;
  return 200;
};

export const getWeekInfoFromDay = (dayNumber: number) => {
  // Handle undefined or invalid day numbers
  if (!dayNumber || dayNumber < 1) {
    return { weekNumber: 1, isDeloadWeek: false };
  }
  
  // Calculate week number (1-indexed)
  const weekNumber = Math.floor((dayNumber - 1) / 7) + 1;
  
  // Determine if it's a deload week (every 4th week)
  const isDeloadWeek = (weekNumber % 4 === 0);
  
  return {
    weekNumber,
    isDeloadWeek
  };
};

export const isRecoveryDay = (dayNumber: number): boolean => {
  // Handle undefined or invalid day numbers
  if (!dayNumber || dayNumber < 1) return false;
  
  return dayNumber % 7 === 0; // Every 7th day is a recovery day
};
