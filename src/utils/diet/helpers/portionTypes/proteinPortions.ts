
/**
 * Helper functions for protein portion handling and customization
 */

// Helper to format protein names with local equivalents
export const getLocalizedProteinName = (protein: string): string => {
  if (protein === 'Paneer' && !protein.includes('(')) {
    return 'Paneer (Indian Cottage Cheese)';
  } else if (protein === 'Tofu' && !protein.includes('(')) {
    return 'Tofu (Soya Paneer)';
  } else if (protein === 'Chana' && !protein.includes('(')) {
    return 'Chana (Chickpeas)';
  } else if (protein === 'Rajma' && !protein.includes('(')) {
    return 'Rajma (Kidney Beans)';
  } else if (protein === 'Soya Chunks' && !protein.includes('(')) {
    return 'Soya Chunks (High-Protein Nuggets)';
  } else if (protein === 'Tempeh' && !protein.includes('(')) {
    return 'Tempeh (Fermented Soybean Cake)';
  } else if (protein === 'Seitan' && !protein.includes('(')) {
    return 'Seitan (Wheat Protein)';
  }
  return protein;
};

// Helper for vegan protein alternatives
export const getVeganProteinAlternative = (nonVeganProtein: string): string => {
  const alternatives: Record<string, string> = {
    'Paneer': 'Tofu',
    'Curd': 'Coconut Yogurt',
    'Greek Yogurt': 'Soy Yogurt',
    'Buttermilk': 'Vegan Buttermilk (coconut milk with lemon)',
    'Milk': 'Soy Milk',
    'Cheese': 'Vegan Cheese',
    'Ghee': 'Olive Oil',
    'Yogurt': 'Almond Yogurt',
    'Egg': 'Tofu Scramble',
    'Chicken': 'Soya Chunks',
    'Meat': 'Seitan',
    'Fish': 'Jackfruit',
    'Mutton': 'Mushroom',
    'Prawns': 'King Oyster Mushrooms',
    'Khoya': 'Cashew Paste'
  };
  
  for (const [nonVegan, vegan] of Object.entries(alternatives)) {
    if (nonVeganProtein.toLowerCase().includes(nonVegan.toLowerCase())) {
      return vegan;
    }
  }
  
  return nonVeganProtein;
};

// Helper to determine protein requirement per kg of body weight based on activity level
export const getProteinPerKgRequirement = (
  exerciseFrequency: string, 
  fitnessGoal: string
): number => {
  // Default to sedentary if no value provided
  if (!exerciseFrequency) return 0.8;
  
  // Activity level based rules - updated to use the range 0.8-1.8 g/kg
  const activityMap: Record<string, number> = {
    'sedentary': 0.8, // Minimum for sedentary individuals
    'light': 1.2, // Light activity
    'moderate': 1.5, // Regular exercise
    'very-active': 1.8 // Maximum for very active individuals
  };
  
  // Adjust based on fitness goal
  let proteinFactor = activityMap[exerciseFrequency] || 0.8;
  
  // Further adjust based on specific goals
  if (fitnessGoal === 'weight-loss') {
    // Higher protein for weight loss to preserve muscle (within the corresponding activity range)
    proteinFactor = Math.max(proteinFactor, 1.2); // At least 1.2 g/kg for weight loss
  } else if (fitnessGoal === 'muscle-gain') {
    // Maximum protein for muscle gain
    proteinFactor = Math.max(proteinFactor, 1.5); // At least 1.5 g/kg for muscle gain
  }
  
  return proteinFactor;
};

// Calculate total daily protein requirement in grams
export const calculateDailyProteinRequirement = (
  weightKg: number = 70,
  exerciseFrequency: string = 'sedentary',
  fitnessGoal: string = 'maintenance'
): number => {
  const proteinPerKg = getProteinPerKgRequirement(exerciseFrequency, fitnessGoal);
  
  // Cap at 1.8 g/kg which is the upper limit for our range
  const cappedProteinPerKg = Math.min(proteinPerKg, 1.8);
  
  return Math.round(weightKg * cappedProteinPerKg);
};

// Helper to get adequate protein portion for dietary preference
export const getProteinPortion = (
  dietaryPreference: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  weightKg?: number,
  exerciseFrequency?: string
): string => {
  // Calculate protein requirements if weight is provided
  let baseProteinPortion: string;
  
  if (weightKg && exerciseFrequency) {
    // Calculate based on guidelines
    const fitnessGoal = isWeightLoss ? 'weight-loss' : 
                        isProteinFocus ? 'muscle-gain' : 'maintenance';
    
    const proteinGrams = calculateDailyProteinRequirement(weightKg, exerciseFrequency, fitnessGoal);
    
    baseProteinPortion = `${proteinGrams}g`;
  } else {
    // Use simpler legacy logic if specific data not provided
    baseProteinPortion = isWeightLoss ? '15-20g' : '20-25g';
    
    if (isProteinFocus) {
      baseProteinPortion = '25-30g';
    }
  }
  
  const proteinGuide: Record<string, string> = {
    'vegan': `${baseProteinPortion} (combine legumes with whole grains for complete protein)`,
    'lacto-vegetarian': baseProteinPortion,
    'lacto-ovo-vegetarian': baseProteinPortion,
    'pure-vegetarian': baseProteinPortion,
    'sattvic': baseProteinPortion,
    'pure-jain': `${baseProteinPortion} (focus on allowed lentils and nuts)`,
    'non-vegetarian': baseProteinPortion
  };
  
  return proteinGuide[dietaryPreference] || baseProteinPortion;
};
