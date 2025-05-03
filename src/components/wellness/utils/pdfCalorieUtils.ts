
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

// Helper to estimate macros based on calories and goals
export const estimateMacros = (totalCalories: number, fitnessGoal: string) => {
  let proteinPct = 0.25;
  let fatPct = 0.3;
  let carbsPct = 0.45;
  
  // Adjust macros based on goal
  if (fitnessGoal === 'weight-loss') {
    proteinPct = 0.3;
    fatPct = 0.25;
    carbsPct = 0.45;
  } else if (fitnessGoal === 'muscle-gain') {
    proteinPct = 0.35;
    fatPct = 0.25;
    carbsPct = 0.4;
  }
  
  const proteinGrams = Math.round((totalCalories * proteinPct) / 4); // 4 cal per gram
  const fatGrams = Math.round((totalCalories * fatPct) / 9); // 9 cal per gram
  const carbGrams = Math.round((totalCalories * carbsPct) / 4); // 4 cal per gram
  
  return { protein: proteinGrams, fat: fatGrams, carbs: carbGrams };
};
