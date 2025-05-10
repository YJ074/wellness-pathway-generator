
// Helper function to estimate calories for each meal type
export const getEstimatedCalories = (mealType: string, baseCalories: number, goalFactor: number): number => {
  const mealFactors: Record<string, number> = {
    'breakfast': 0.25,
    'midMorningSnack': 0.1,
    'lunch': 0.35,
    'eveningSnack': 0.1, 
    'dinner': 0.2
  };
  
  return Math.round((baseCalories * mealFactors[mealType] || 0) * goalFactor);
};

// Import the new protein calculation function
import { calculateDailyProteinRequirement, getProteinPerKgRequirement } from '@/utils/diet/helpers/portionTypes/proteinPortions';

// Helper to estimate macros based on calories, goals, weight, and gender
export const estimateMacros = (
  totalCalories: number, 
  fitnessGoal: string, 
  weightKg: number = 70, 
  gender: string = 'female',
  dietaryPreference?: string,
  exerciseFrequency: string = 'sedentary'
) => {
  // Calculate protein based on activity level and goals using the new function
  let proteinGrams: number;
  
  // Use new activity-based calculation with updated range (0.8-1.8g/kg)
  proteinGrams = calculateDailyProteinRequirement(weightKg, exerciseFrequency, fitnessGoal);
  
  // For vegan diets, slightly increase the protein recommendation to account for lower bioavailability
  if (dietaryPreference === 'vegan') {
    proteinGrams = Math.round(proteinGrams * 1.1); // 10% more for vegans
  }
  
  // Cap protein at reasonable levels without supplements
  proteinGrams = Math.min(proteinGrams, 140); // More reasonable cap for protein intake
  
  // Calculate protein calories
  const proteinCalories = proteinGrams * 4; // 4 calories per gram of protein
  
  // Calculate remaining calories for fats and carbs
  const remainingCalories = totalCalories - proteinCalories;
  
  // Default macro split for remaining calories
  let fatPct = 0.4; // 40% of remaining calories from fat
  let carbsPct = 0.6; // 60% of remaining calories from carbs
  
  // Adjust fat/carb ratio based on goal
  if (fitnessGoal === 'weight-loss') {
    fatPct = 0.45; // Slightly more fat, less carbs for weight loss
    carbsPct = 0.55;
  } else if (fitnessGoal === 'muscle-gain') {
    fatPct = 0.35; // More carbs for muscle gain (for energy)
    carbsPct = 0.65;
  }
  
  // Calculate fat and carb grams
  const fatGrams = Math.round((remainingCalories * fatPct) / 9); // 9 calories per gram of fat
  const carbGrams = Math.round((remainingCalories * carbsPct) / 4); // 4 calories per gram of carbs
  
  return { protein: proteinGrams, fat: fatGrams, carbs: carbGrams };
};
