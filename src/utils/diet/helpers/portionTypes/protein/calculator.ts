
/**
 * Helper functions for protein requirement calculation
 */

/**
 * Get protein requirement per kg based on scientific guidelines and Indian RDA:
 * - For adults: 0.8-1.0 g/kg (RDA baseline, ICMR India)
 *   - Men: Higher end of range (NIN guidelines)
 *   - Women: Lower end of range
 * 
 * - Activity adjustments:
 *   - Sedentary: Base RDA
 *   - Light activity: +0.1-0.2 g/kg
 *   - Moderate: +0.2-0.4 g/kg
 *   - Very active: +0.4-0.8 g/kg
 * 
 * - Goal adjustments:
 *   - Weight loss: +0.2-0.4 g/kg (preserve lean mass)
 *   - Muscle gain: +0.2-0.4 g/kg
 * 
 * References: ICMR-NIN (Indian Council of Medical Research - National Institute of Nutrition)
 */
export const getProteinPerKgRequirement = (
  exerciseFrequency: string, 
  fitnessGoal: string,
  gender: string = 'female' // Default to female for safety
): number => {
  // Base protein requirements by activity level, adjusted for gender
  // Following Indian RDA guidelines from ICMR-NIN
  const activityMap: Record<string, Record<string, number>> = {
    'male': {
      'sedentary': 0.9,    // Higher baseline for men per Indian RDA
      'light': 1.1,        // Light activity (1-3 days/week)
      'moderate': 1.3,     // Regular exercise (3-5 days/week)
      'very-active': 1.7   // Very active (6-7 days/week)
    },
    'female': {
      'sedentary': 0.8,    // Baseline RDA for women
      'light': 1.0,        // Light activity (1-3 days/week)
      'moderate': 1.2,     // Regular exercise (3-5 days/week)
      'very-active': 1.5   // Very active (6-7 days/week)
    }
  };
  
  // Default to female values if gender not specified
  const genderKey = gender === 'male' ? 'male' : 'female';
  
  // Get base requirement from activity level and gender
  let proteinFactor = activityMap[genderKey][exerciseFrequency] || 
                     (genderKey === 'male' ? 0.9 : 0.8); // Default to sedentary
  
  // Adjust for specific fitness goals
  if (fitnessGoal === 'weight-loss') {
    // Higher protein for weight loss to preserve muscle
    proteinFactor += 0.3;
  } else if (fitnessGoal === 'muscle-gain') {
    // Maximum protein for muscle gain
    proteinFactor += 0.4;
  }
  
  // Cap at practical upper limit based on gender
  // ICMR guidelines suggest not exceeding 2.2g/kg for men, 2.0g/kg for women for safety
  const upperLimit = gender === 'male' ? 2.2 : 2.0;
  return Math.min(proteinFactor, upperLimit);
};

/**
 * Calculate daily protein requirement in grams based on:
 * - Body weight
 * - Activity level
 * - Fitness goals
 * - Gender (new parameter)
 */
export const calculateDailyProteinRequirement = (
  weightKg: number = 70,
  exerciseFrequency: string = 'sedentary',
  fitnessGoal: string = 'maintenance',
  gender: string = 'female'
): number => {
  const proteinPerKg = getProteinPerKgRequirement(exerciseFrequency, fitnessGoal, gender);
  
  // Calculate total daily protein requirement
  return Math.round(weightKg * proteinPerKg);
};

/**
 * Get protein portion recommendation with appropriate guidance
 * based on dietary preference, goals, and gender
 */
export const getProteinPortion = (
  dietaryPreference: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  weightKg?: number,
  exerciseFrequency?: string,
  gender?: string
): string => {
  // Calculate protein requirements if weight is provided
  let baseProteinPortion: string;
  
  if (weightKg && exerciseFrequency) {
    // Calculate based on guidelines
    const fitnessGoal = isWeightLoss ? 'weight-loss' : 
                        isProteinFocus ? 'muscle-gain' : 'maintenance';
    
    const proteinGrams = calculateDailyProteinRequirement(
      weightKg, 
      exerciseFrequency, 
      fitnessGoal, 
      gender
    );
    
    baseProteinPortion = `${proteinGrams}g`;
  } else {
    // Fallback to basic ranges if specific data not provided
    // Adjust ranges based on gender
    if (gender === 'male') {
      baseProteinPortion = isWeightLoss ? '1.3-1.6g/kg' : '0.9-1.3g/kg';
      if (isProteinFocus) {
        baseProteinPortion = '1.7-2.2g/kg';
      }
    } else {
      baseProteinPortion = isWeightLoss ? '1.2-1.5g/kg' : '0.8-1.2g/kg';
      if (isProteinFocus) {
        baseProteinPortion = '1.6-2.0g/kg';
      }
    }
  }
  
  // Add specific guidance for different dietary preferences
  const proteinGuide: Record<string, string> = {
    'vegan': `${baseProteinPortion} (emphasis on complete protein combinations)`,
    'lacto-vegetarian': `${baseProteinPortion} (focus on dairy and legume combinations)`,
    'lacto-ovo-vegetarian': baseProteinPortion,
    'pure-vegetarian': `${baseProteinPortion} (vary protein sources throughout the day)`,
    'sattvic': `${baseProteinPortion} (balance of dairy, legumes, and nuts)`,
    'jain': `${baseProteinPortion} (emphasize allowed legumes, nuts and dairy)`,
    'non-vegetarian': baseProteinPortion
  };
  
  return proteinGuide[dietaryPreference] || baseProteinPortion;
};
