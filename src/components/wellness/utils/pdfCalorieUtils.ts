
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

// Helper to estimate macros based on calories, goals and weight
export const estimateMacros = (totalCalories: number, fitnessGoal: string, weightKg: number = 70) => {
  // Calculate protein based on weight (1-1.5g per kg of body weight)
  let proteinPerKg = 1.0; // Default 1g per kg
  
  // Adjust protein based on goal
  if (fitnessGoal === 'weight-loss') {
    proteinPerKg = 1.2; // Higher protein for weight loss (preserves muscle)
  } else if (fitnessGoal === 'muscle-gain') {
    proteinPerKg = 1.5; // Highest protein for muscle gain
  } else {
    proteinPerKg = 1.0; // Maintenance
  }
  
  // Calculate protein in grams based on weight
  const proteinGrams = Math.round(weightKg * proteinPerKg);
  
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
