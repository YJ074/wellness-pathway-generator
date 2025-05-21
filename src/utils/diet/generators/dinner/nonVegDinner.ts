
import { generateNonVegDish } from '../nonVeg';

/**
 * Generates a non-vegetarian dinner dish
 */
export function generateNonVegDinner(
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType: string,
  allergies?: string,
  region?: string
): string {
  // Simply delegate to the existing non-veg dish generator
  return generateNonVegDish(
    dayIndex,
    isWeightLoss,
    isProteinFocus,
    nonVegType,
    allergies,
    region
  );
}
