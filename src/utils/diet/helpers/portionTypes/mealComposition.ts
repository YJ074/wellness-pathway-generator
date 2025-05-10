
/**
 * Helper functions for assembling meal components with proper portions
 */

// Helper for portion sizes based on dietary goals
export const getPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean, 
  item: string,
  options: {
    standard: string,
    weightLoss?: string,
    proteinFocus?: string
  }
): string => {
  if (isWeightLoss && options.weightLoss) {
    return options.weightLoss;
  } else if (isProteinFocus && options.proteinFocus) {
    return options.proteinFocus;
  }
  return options.standard;
};

// Helper for composing meals based on regional preferences
export const composeRegionalMeal = (
  regionalDish: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  if (isWeightLoss) {
    return `${regionalDish} (lighter portion for evening)`;
  } else if (isProteinFocus) {
    return `${regionalDish} with extra protein`;
  }
  return regionalDish;
};

// Helper to create a standardized dinner meal with curry, vegetables, and carbs
export const composeDinnerMeal = (
  protein: string,
  veggie1: string,
  veggie2: string,
  curryPortion: string,
  veggiePortion: string,
  rotiCount: string,
  ricePortion: string
): string => {
  return `${protein} curry (${curryPortion}), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), Roti (${rotiCount}), or Bhura Chaval (${ricePortion} Brown Rice)`;
};

// Helper for creating standardized meal items with portion sizes
export const createMealItem = (
  itemName: string,
  portionInfo: string
): string => {
  return `${itemName} (${portionInfo})`;
};
