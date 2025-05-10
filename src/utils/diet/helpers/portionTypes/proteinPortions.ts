
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

/**
 * Get protein requirement per kg based on scientific guidelines:
 * - Sedentary: 0.8-1.0 g/kg (RDA baseline)
 * - Light activity: 1.0-1.2 g/kg
 * - Moderate: 1.2-1.4 g/kg
 * - Very active: 1.4-1.8 g/kg
 * - Athletes: 1.6-2.2 g/kg
 * 
 * Adjustments based on goals:
 * - Weight loss: +0.2-0.4 g/kg (preserve lean mass)
 * - Muscle gain: +0.2-0.4 g/kg
 * 
 * References: ACSM, ISSN, and ESPEN guidelines
 */
export const getProteinPerKgRequirement = (
  exerciseFrequency: string, 
  fitnessGoal: string
): number => {
  // Base protein requirements by activity level
  const activityMap: Record<string, number> = {
    'sedentary': 0.8,    // Minimum RDA for sedentary individuals
    'light': 1.1,        // Light activity (1-3 days/week)
    'moderate': 1.3,     // Regular exercise (3-5 days/week)
    'very-active': 1.6   // Very active (6-7 days/week)
  };
  
  // Get base requirement from activity level
  let proteinFactor = activityMap[exerciseFrequency] || 0.8;
  
  // Adjust for specific fitness goals
  if (fitnessGoal === 'weight-loss') {
    // Higher protein for weight loss to preserve muscle
    proteinFactor += 0.3;
  } else if (fitnessGoal === 'muscle-gain') {
    // Maximum protein for muscle gain
    proteinFactor += 0.4;
  }
  
  // Cap at practical upper limit for non-athletes (2.0 g/kg)
  return Math.min(proteinFactor, 2.0);
};

/**
 * Calculate daily protein requirement in grams based on:
 * - Body weight
 * - Activity level
 * - Fitness goals
 */
export const calculateDailyProteinRequirement = (
  weightKg: number = 70,
  exerciseFrequency: string = 'sedentary',
  fitnessGoal: string = 'maintenance'
): number => {
  const proteinPerKg = getProteinPerKgRequirement(exerciseFrequency, fitnessGoal);
  
  // Calculate total daily protein requirement
  return Math.round(weightKg * proteinPerKg);
};

/**
 * Get protein portion recommendation with appropriate guidance
 * based on dietary preference and goals
 */
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
    // Fallback to basic ranges if specific data not provided
    baseProteinPortion = isWeightLoss ? '1.2-1.5g/kg' : '0.8-1.2g/kg';
    
    if (isProteinFocus) {
      baseProteinPortion = '1.6-2.0g/kg';
    }
  }
  
  // Add specific guidance for different dietary preferences
  const proteinGuide: Record<string, string> = {
    'vegan': `${baseProteinPortion} (emphasis on complete protein combinations)`,
    'lacto-vegetarian': `${baseProteinPortion} (focus on dairy and legume combinations)`,
    'lacto-ovo-vegetarian': baseProteinPortion,
    'pure-vegetarian': `${baseProteinPortion} (vary protein sources throughout the day)`,
    'sattvic': `${baseProteinPortion} (balance of dairy, legumes, and nuts)`,
    'pure-jain': `${baseProteinPortion} (emphasize allowed legumes, nuts and dairy)`,
    'non-vegetarian': baseProteinPortion
  };
  
  return proteinGuide[dietaryPreference] || baseProteinPortion;
};
