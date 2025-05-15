
/**
 * Food description deduplication module
 * Main entry point that re-exports all deduplication functionality
 */

// Re-export all public functions from the modules
export { hasFoodItem, extractBaseFoodName, detectDuplicateFoods } from './detection';
export type { DuplicateDetectionOptions } from './detection';
export { DEFAULT_OPTIONS } from './detection';
export { addWithoutDuplication } from './addition';
export { removeDuplicateFoodItems, normalizeMealForPDF } from './mealNormalization';
export { FOOD_SYNONYMS, getSynonymsForFood, hasSynonymInSeenFoods } from './synonyms';
export { 
  normalizeWhitespaceAndPunctuation, 
  formatForPDF, 
  formatAddition, 
  cleanupDuplicationFormatting 
} from './formatting';

// Import the normalizeMealForPDF function for use in this file
import { normalizeMealForPDF } from './mealNormalization';

// Export enhanced deduplication functionality
export const applyTriplePassDeduplication = (mealDescription: string): string => {
  if (!mealDescription) return '';
  
  // Apply multiple passes of deduplication for maximum effectiveness
  const firstPass = normalizeMealForPDF(mealDescription);
  const secondPass = normalizeMealForPDF(firstPass);
  const thirdPass = normalizeMealForPDF(secondPass);
  
  return thirdPass;
};

// Track food items that have been used in a day to prevent cross-meal repetition
const dailyFoodMemory = new Map<number, Set<string>>();

/**
 * Reset the food memory for a specific day
 * @param dayIndex The day index to reset memory for
 */
export const resetDailyFoodMemory = (dayIndex: number): void => {
  dailyFoodMemory.delete(dayIndex);
};

/**
 * Reset all daily food memory
 */
export const resetAllFoodMemory = (): void => {
  dailyFoodMemory.clear();
};

/**
 * Check if a food item has been used in any meal for a specific day
 * @param dayIndex The day index to check
 * @param foodItem The food item to check
 */
export const hasFoodBeenUsedToday = (dayIndex: number, foodItem: string): boolean => {
  const dayMemory = dailyFoodMemory.get(dayIndex);
  if (!dayMemory) return false;
  
  const baseName = extractBaseFoodName(foodItem.toLowerCase());
  
  // Check for the exact base name or any synonyms
  return dayMemory.has(baseName) || hasSynonymInSeenFoods(baseName, dayMemory);
};

/**
 * Add a food item to the daily memory to prevent repetition
 * @param dayIndex The day index
 * @param foodItem The food item to add
 */
export const addFoodToDailyMemory = (dayIndex: number, foodItem: string): void => {
  if (!foodItem) return;
  
  // Get or initialize the day's memory
  let dayMemory = dailyFoodMemory.get(dayIndex);
  if (!dayMemory) {
    dayMemory = new Set<string>();
    dailyFoodMemory.set(dayIndex, dayMemory);
  }
  
  // Add the base food name to memory
  const baseName = extractBaseFoodName(foodItem.toLowerCase());
  if (baseName && baseName.length > 2) {
    dayMemory.add(baseName);
  }
};

/**
 * Check if a meal description contains any foods that have already been used today
 * @param dayIndex The day index
 * @param mealDescription The meal description to check
 * @returns Array of duplicate food items found
 */
export const findDuplicateFoodsInDay = (dayIndex: number, mealDescription: string): string[] => {
  const duplicates: string[] = [];
  const dayMemory = dailyFoodMemory.get(dayIndex);
  if (!dayMemory || !mealDescription) return duplicates;
  
  // Extract food items from the meal description
  const foodPattern = /(\w+(?:\s+\w+)*)(?:\s*\([^)]*\))?/g;
  let match;
  
  while ((match = foodPattern.exec(mealDescription)) !== null) {
    const foodItem = match[1].trim();
    if (foodItem.length < 3) continue; // Skip very short words
    
    const baseName = extractBaseFoodName(foodItem.toLowerCase());
    if (baseName.length < 2) continue; // Skip invalid items
    
    // Check if this food has been used today
    if (dayMemory.has(baseName) || hasSynonymInSeenFoods(baseName, dayMemory)) {
      duplicates.push(baseName);
    }
  }
  
  return duplicates;
};
