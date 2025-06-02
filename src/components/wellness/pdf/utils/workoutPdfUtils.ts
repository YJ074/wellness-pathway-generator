
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

export const getEstimatedCaloriesBurned = (isRestDay: boolean, exerciseFrequency: string, weekNumber: number = 1, gender?: string, age?: string | number): number => {
  if (isRestDay) return 100;
  
  // Base calories based on exercise frequency
  let baseCalories = 200;
  if (exerciseFrequency === '5+') baseCalories = 350;
  else if (exerciseFrequency === '3-4') baseCalories = 280;
  
  // Age-based calorie adjustments
  const ageNumber = age ? parseInt(age.toString()) : 30;
  let ageMultiplier = 1;
  
  if (ageNumber >= 60) {
    ageMultiplier = 0.75; // 25% reduction for 60+
  } else if (ageNumber >= 50) {
    ageMultiplier = 0.85; // 15% reduction for 50-59
  } else if (ageNumber >= 40) {
    ageMultiplier = 0.95; // 5% reduction for 40-49
  } else if (ageNumber < 25) {
    ageMultiplier = 1.1; // 10% increase for under 25
  }
  
  // Gender-specific calorie adjustments
  let genderMultiplier = 1;
  if (gender === 'male') {
    genderMultiplier = 1.15; // Males typically burn 15% more calories
  } else if (gender === 'female') {
    genderMultiplier = 0.9; // Females typically burn 10% fewer calories but have better efficiency
  }
  
  // Apply progression factor based on week number (5% increase every 2 weeks, up to 80% more)
  // Adjust progression based on age
  const maxProgressionFactor = ageNumber >= 50 ? 1.5 : ageNumber >= 40 ? 1.65 : 1.8;
  const progressionRate = ageNumber >= 50 ? 0.03 : ageNumber >= 40 ? 0.04 : 0.05;
  const progressionFactor = Math.min(1 + (Math.floor(weekNumber / 2) * progressionRate), maxProgressionFactor);
  
  return Math.round(baseCalories * ageMultiplier * genderMultiplier * progressionFactor);
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
