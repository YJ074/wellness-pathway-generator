
/**
 * Utility functions for estimating meal calories
 * Provides consistent calorie distribution across meal types
 */

// Calorie distribution percentages for each meal type
const MEAL_CALORIE_DISTRIBUTION = {
  breakfast: 0.25, // 25% of daily calories
  midMorningSnack: 0.1, // 10% of daily calories
  lunch: 0.3, // 30% of daily calories
  afternoonSnack: 0.05, // 5% of daily calories
  eveningSnack: 0.1, // 10% of daily calories
  dinner: 0.2 // 20% of daily calories
};

export type MealType = 'breakfast' | 'midMorningSnack' | 'lunch' | 'afternoonSnack' | 'eveningSnack' | 'dinner';

/**
 * Gets the estimated calories for a specific meal type based on daily calorie target
 * 
 * @param mealType The type of meal to calculate calories for
 * @param dailyCalories The total daily calorie target
 * @param adjustmentFactor Optional factor to adjust calories (e.g., 1.1 for 10% more)
 * @returns Estimated calories for the meal
 */
export const getEstimatedCalories = (
  mealType: MealType,
  dailyCalories: number,
  adjustmentFactor: number = 1.0
): number => {
  const baseDistribution = MEAL_CALORIE_DISTRIBUTION[mealType] || 0.1;
  const mealCalories = Math.round(dailyCalories * baseDistribution * adjustmentFactor);
  
  return mealCalories;
};

/**
 * Gets the calorie distribution across all meals for a day
 * 
 * @param dailyCalories The total daily calorie target
 * @returns Object with calorie amounts for each meal type
 */
export const getMealCalorieDistribution = (dailyCalories: number): Record<MealType, number> => {
  return {
    breakfast: getEstimatedCalories('breakfast', dailyCalories),
    midMorningSnack: getEstimatedCalories('midMorningSnack', dailyCalories),
    lunch: getEstimatedCalories('lunch', dailyCalories),
    afternoonSnack: getEstimatedCalories('afternoonSnack', dailyCalories),
    eveningSnack: getEstimatedCalories('eveningSnack', dailyCalories),
    dinner: getEstimatedCalories('dinner', dailyCalories)
  };
};
