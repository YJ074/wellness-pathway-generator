
/**
 * Helper functions for basic meal composition and portion sizing
 */

// Helper function to determine portion size based on dietary goals
export const getPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  mealType: 'rice' | 'curry' | 'vegetable',
  portions: {
    standard: string;
    weightLoss: string;
    proteinFocus: string;
  }
): string => {
  if (isWeightLoss) {
    return portions.weightLoss;
  } else if (isProteinFocus) {
    return portions.proteinFocus;
  } else {
    return portions.standard;
  }
};

// Helper function to compose a dinner meal with portion control
export const composeDinnerMeal = (
  protein: string,
  vegetables: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean = false
): string => {
  // Gender-specific portion descriptions
  let portionDescription = "";
  if (isMale) {
    if (isWeightLoss) {
      portionDescription = 'moderate portions';
    } else if (isProteinFocus) {
      portionDescription = 'large protein-rich portions';
    } else {
      portionDescription = 'standard male portions';
    }
  } else {
    if (isWeightLoss) {
      portionDescription = 'smaller portions';
    } else if (isProteinFocus) {
      portionDescription = 'protein-rich portions';
    } else {
      portionDescription = 'balanced portions';
    }
  }
  
  return `${protein} and ${vegetables} (${portionDescription})`;
};

// Helper function to create a meal item with portion control
export const createMealItem = (
  item: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean = false
): string => {
  let portionDescription = "";
  
  // Determine appropriate portion description based on goals and gender
  if (isMale) {
    if (isWeightLoss) {
      portionDescription = 'moderate portion';
    } else if (isProteinFocus) {
      portionDescription = 'large protein-rich portion';
    } else {
      portionDescription = 'standard male portion';
    }
  } else {
    if (isWeightLoss) {
      portionDescription = 'smaller portion';
    } else if (isProteinFocus) {
      portionDescription = 'protein-rich portion';
    } else {
      portionDescription = 'balanced portion';
    }
  }
  
  return `${item} (${portionDescription})`;
};
