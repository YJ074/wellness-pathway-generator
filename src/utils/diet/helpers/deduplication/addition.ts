
/**
 * Food item addition functionality
 * Handles adding new food items to existing meal descriptions without duplication
 */

import { hasFoodItem } from './detection';
import { formatAddition } from './formatting';
import { cleanupDuplicationFormatting } from './formatting';

/**
 * Adds a food item to a meal description only if it's not already present
 * @param mealDescription The original meal description
 * @param addition The food item to add
 * @param options Optional configuration for duplicate detection
 * @returns The updated meal description with addition if not already present
 */
export const addWithoutDuplication = (
  mealDescription: string,
  addition: string
): string => {
  // If meal description is empty, just return the addition
  if (!mealDescription || mealDescription.trim() === '') {
    return addition;
  }
  
  // Check if the addition is already included in the meal description
  if (hasFoodItem(mealDescription, addition)) {
    return mealDescription;
  }
  
  // Add the item with proper formatting
  const result = formatAddition(mealDescription, addition);
  
  // Clean up any formatting issues that might have occurred
  return cleanupDuplicationFormatting(result);
};
