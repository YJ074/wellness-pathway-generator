
/**
 * Common helper functions for regional meal portions
 */

// Helper function to compose regional meals with appropriate portion sizing
export const composeRegionalMeal = (
  dish: string, 
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
  
  // Use the specific portion description
  return `${dish} (${portionDescription})`;
};
