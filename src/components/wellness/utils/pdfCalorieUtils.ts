
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

// Import the protein calculation function
import { calculateDailyProteinRequirement, getProteinPerKgRequirement } from '@/utils/diet/helpers/portionTypes/protein';

/**
 * Estimate macronutrient distribution based on:
 * - Total daily calories
 * - Fitness goals
 * - Body weight
 * - Gender
 * - Dietary preference
 * - Activity level
 * 
 * Following evidence-based nutritional guidelines
 */
export const estimateMacros = (
  totalCalories: number, 
  fitnessGoal: string, 
  weightKg: number = 70, 
  gender: string = 'female',
  dietaryPreference?: string,
  exerciseFrequency: string = 'sedentary'
) => {
  // Calculate protein requirement based on weight, activity and goals
  let proteinGrams = calculateDailyProteinRequirement(weightKg, exerciseFrequency, fitnessGoal);
  
  // Adjust protein for vegan diets to account for lower bioavailability
  // Science shows 15-20% higher intake may be needed for equivalent amino acid utilization
  if (dietaryPreference === 'vegan') {
    proteinGrams = Math.round(proteinGrams * 1.15);
  }
  
  // Calculate practical daily protein ceiling based on weight
  // Most research shows diminishing returns above 2.2g/kg for most individuals
  const proteinCeiling = Math.round(weightKg * 2.2);
  
  // Cap protein at reasonable levels achievable through whole foods
  proteinGrams = Math.min(proteinGrams, proteinCeiling, 170); 
  
  // Calculate protein calories (4 calories per gram)
  const proteinCalories = proteinGrams * 4;
  
  // Calculate remaining calories for fats and carbs
  const remainingCalories = totalCalories - proteinCalories;
  
  // Set macro ratios based on fitness goal
  let fatPct, carbsPct;
  
  if (fitnessGoal === 'weight-loss') {
    // Higher fat, moderate carbs for satiety during weight loss
    // Research supports higher fat helping with hunger management
    fatPct = 0.40; 
    carbsPct = 0.60;
  } else if (fitnessGoal === 'muscle-gain') {
    // Higher carbs for muscle glycogen replenishment and energy for workouts
    fatPct = 0.35;
    carbsPct = 0.65;
  } else {
    // Balanced approach for maintenance
    fatPct = 0.38;
    carbsPct = 0.62;
  }
  
  // Calculate fat and carb grams
  const fatGrams = Math.round((remainingCalories * fatPct) / 9); // 9 calories per gram of fat
  const carbGrams = Math.round((remainingCalories * carbsPct) / 4); // 4 calories per gram of carbs
  
  return { 
    protein: proteinGrams, 
    fat: fatGrams, 
    carbs: carbGrams
  };
};
