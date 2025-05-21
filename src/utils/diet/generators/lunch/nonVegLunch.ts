
import { getAllowedNonVegTypes } from '../../helpers/dietaryPreferenceHelper';
import { generateNonVegDish } from '../nonVeg';

/**
 * Generate a non-vegetarian lunch option
 */
export const generateNonVegLunch = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  dietaryPreference: string,
  allergies?: string,
  region?: string,
  gender?: string
) => {
  // Get allowed non-veg types based on dietary preference
  const allowedTypes = getAllowedNonVegTypes(dietaryPreference);
  
  // Use different non-veg types on different days for variety
  const nonVegType = allowedTypes[(dayIndex * 7 + 3) % allowedTypes.length];
  
  // Generate the non-vegetarian dish with all required parameters
  return generateNonVegDish(
    dayIndex,
    isWeightLoss,
    isProteinFocus,
    nonVegType,
    allergies,
    region
  );
};
