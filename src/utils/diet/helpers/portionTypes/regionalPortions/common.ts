
/**
 * Common helper functions for regional portion control
 */

// Helper function to compose a regional meal with portion control
export const composeRegionalMeal = (
  regionalMeal: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let meal = regionalMeal;
  if (isWeightLoss) {
    meal += ' (smaller portion)';
  } else if (isProteinFocus) {
    meal += ' (protein-rich portion)';
  }
  return meal;
};
