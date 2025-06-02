
import { FormData } from '../../types';

export const getDifficultyLevel = (exerciseFrequency: string, weekNumber: number = 1): string => {
  // Base difficulty on exercise frequency
  let baseDifficulty = 'Beginner';
  if (exerciseFrequency === '5+') {
    baseDifficulty = 'Advanced';
  } else if (exerciseFrequency === '3-4') {
    baseDifficulty = 'Intermediate';
  }
  
  // Progress difficulty based on week number
  if (baseDifficulty === 'Beginner' && weekNumber > 8) {
    return 'Intermediate';
  } else if (baseDifficulty === 'Intermediate' && weekNumber > 10) {
    return 'Advanced';
  }
  
  return baseDifficulty;
};

export const getDailyFocusArea = (dayNumber: number, fitnessGoal: string, gender?: string): string => {
  // Ensure dayNumber is valid
  if (!dayNumber || dayNumber < 1) return "General Fitness";
  
  const dayInWeek = dayNumber % 7;
  
  switch (dayInWeek) {
    case 1: 
      return gender === 'female' ? "Core & Pelvic Floor Strength" : "Core & Stability";
    case 2: 
      return "Mobility & Flexibility";
    case 3: 
      return gender === 'female' ? "Functional Strength" : "Strength & Power";
    case 4: 
      return "Yoga & Balance";
    case 5: 
      return "Functional Movement";
    case 6: 
      if (fitnessGoal === 'weight-loss') {
        return gender === 'female' ? "HIIT & Metabolic Training" : "HIIT & Cardio";
      }
      return "Endurance";
    case 0: 
      return "Recovery & Regeneration"; // Day 7, 14, etc.
    default: 
      return "General Fitness";
  }
};

export const getEstimatedCaloriesBurned = (isRestDay: boolean, exerciseFrequency: string, weekNumber: number = 1, gender?: string): number => {
  if (isRestDay) return 100;
  
  // Base calories based on exercise frequency
  let baseCalories = 200;
  if (exerciseFrequency === '5+') baseCalories = 350;
  else if (exerciseFrequency === '3-4') baseCalories = 280;
  
  // Gender-specific calorie adjustments
  let genderMultiplier = 1;
  if (gender === 'male') {
    genderMultiplier = 1.15; // Males typically burn 15% more calories
  } else if (gender === 'female') {
    genderMultiplier = 0.9; // Females typically burn 10% fewer calories but have better efficiency
  }
  
  // Apply progression factor based on week number (5% increase every 2 weeks, up to 80% more)
  const progressionFactor = Math.min(1 + (Math.floor(weekNumber / 2) * 0.05), 1.8);
  return Math.round(baseCalories * genderMultiplier * progressionFactor);
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
