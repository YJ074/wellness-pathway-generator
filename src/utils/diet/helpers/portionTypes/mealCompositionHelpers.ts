
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
  isProteinFocus: boolean
): string => {
  let meal = `${protein} and ${vegetables}`;
  if (isWeightLoss) {
    meal += ' (smaller portions)';
  } else if (isProteinFocus) {
    meal += ' (protein-rich portions)';
  }
  return meal;
};

// Helper function to create a meal item with portion control
export const createMealItem = (
  item: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let mealItem = item;
  if (isWeightLoss) {
    mealItem += ' (smaller portion)';
  } else if (isProteinFocus) {
    mealItem += ' (protein-rich portion)';
  }
  return mealItem;
};
