
/**
 * Food description deduplication module
 * Main entry point that re-exports all deduplication functionality
 */

// Re-export all public functions from the modules
export { hasFoodItem, extractBaseFoodName, detectDuplicateFoods } from './detection';
export type { DuplicateDetectionOptions } from './detection';
export { DEFAULT_OPTIONS } from './detection';
export { addWithoutDuplication } from './addition';
export { 
  removeDuplicateFoodItems, 
  normalizeMealForPDF, 
  deduplicateMealWithDailyContext 
} from './mealNormalization';
export { FOOD_SYNONYMS, getSynonymsForFood, hasSynonymInSeenFoods } from './synonyms';
export { 
  normalizeWhitespaceAndPunctuation, 
  formatForPDF, 
  formatAddition, 
  cleanupDuplicationFormatting 
} from './formatting';

// Import the normalizeMealForPDF function for use in this file
import { normalizeMealForPDF } from './mealNormalization';

// Import additional functions needed in this file
import { extractBaseFoodName } from './detection';
import { hasSynonymInSeenFoods } from './synonyms';

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

// Define food groups for rotation and diversity tracking
const FOOD_GROUPS = {
  DAIRY: ['dahi', 'chaas', 'yogurt', 'curd', 'buttermilk', 'milk', 'paneer', 'cheese'],
  LEGUMES: ['mung', 'moong', 'masoor', 'toor', 'tur', 'chana', 'rajma', 'kidney', 'beans', 'peas', 'lentil', 'dal', 'urad', 'black-eyed']
};

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
 * Check if a food belongs to a specific food group
 * @param foodItem The food item to check
 * @param groupName The food group to check against
 */
const belongsToFoodGroup = (foodItem: string, groupItems: string[]): boolean => {
  const lowerFood = foodItem.toLowerCase();
  return groupItems.some(item => lowerFood.includes(item));
};

/**
 * Check if any food from the same group has been used in a day
 * @param dayIndex The day index to check
 * @param foodItem The food item to check
 * @param group The food group to check
 */
export const hasFoodGroupBeenUsedToday = (dayIndex: number, foodItem: string, group: string[]): boolean => {
  const dayMemory = dailyFoodMemory.get(dayIndex);
  if (!dayMemory) return false;
  
  const isFoodInGroup = belongsToFoodGroup(foodItem, group);
  if (!isFoodInGroup) return false;
  
  // Check if any food from the same group is already in the day's memory
  return Array.from(dayMemory).some(item => belongsToFoodGroup(item, group));
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
  
  // First check for exact match
  if (dayMemory.has(baseName)) return true;
  
  // Check for synonyms
  if (hasSynonymInSeenFoods(baseName, dayMemory)) return true;
  
  // Check food groups - prevent multiple dairy products or similar legumes
  if (belongsToFoodGroup(baseName, FOOD_GROUPS.DAIRY) && 
      hasFoodGroupBeenUsedToday(dayIndex, baseName, FOOD_GROUPS.DAIRY)) {
    return true;
  }
  
  // Check for legume repetition - encourage variety
  if (belongsToFoodGroup(baseName, FOOD_GROUPS.LEGUMES) && 
      hasFoodGroupBeenUsedToday(dayIndex, baseName, FOOD_GROUPS.LEGUMES)) {
    // Only consider this a repeat if it's a very similar legume
    // This allows different types of legumes in the same day
    const similarLegumes = ['mung', 'moong'].includes(baseName) ? ['mung', 'moong'] :
                           ['masoor', 'lentil'].includes(baseName) ? ['masoor', 'lentil'] :
                           ['toor', 'tur'].includes(baseName) ? ['toor', 'tur'] :
                           ['rajma', 'kidney'].includes(baseName) ? ['rajma', 'kidney'] : 
                           null;
    
    if (similarLegumes) {
      return Array.from(dayMemory).some(item => similarLegumes.some(l => item.includes(l)));
    }
  }
  
  return false;
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
    
    // Check food groups - prevent multiple dairy products
    if (belongsToFoodGroup(baseName, FOOD_GROUPS.DAIRY) && 
        hasFoodGroupBeenUsedToday(dayIndex, baseName, FOOD_GROUPS.DAIRY)) {
      duplicates.push(`${baseName} (dairy group)`);
    }
  }
  
  return duplicates;
};
