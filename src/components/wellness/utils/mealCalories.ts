
// Utility function to calculate calories for each meal based on total daily calories
export const calculateMealCalories = (totalCalories: number = 2000) => {
  return {
    breakfast: Math.round(totalCalories * 0.25), // 25% of daily calories
    midMorningSnack: Math.round(totalCalories * 0.1), // 10% of daily calories
    lunch: Math.round(totalCalories * 0.35), // 35% of daily calories
    eveningSnack: Math.round(totalCalories * 0.1), // 10% of daily calories
    dinner: Math.round(totalCalories * 0.2) // 20% of daily calories
  };
};
