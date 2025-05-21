
/**
 * Daily Food Memory System
 * Tracks which food items have been used in a day to avoid repetition across meals
 */

import { extractBaseFoodName } from '../detection';
import { hasSynonymInSeenFoods } from '../synonyms';

// Store seen food items by day index to track cross-meal duplicates
const dailyFoodMemory: Map<number, Set<string>> = new Map();

/**
 * Reset the food memory for a specific day
 * @param dayIndex The day index to reset
 */
export const resetDailyFoodMemory = (dayIndex: number): void => {
  dailyFoodMemory.set(dayIndex, new Set<string>());
};

/**
 * Add a food item or meal description to the daily memory
 * @param dayIndex The day index to track
 * @param foodDescription The food item or full meal description
 */
export const addFoodToDailyMemory = (dayIndex: number, foodDescription: string): void => {
  // Ensure the day exists in memory
  if (!dailyFoodMemory.has(dayIndex)) {
    resetDailyFoodMemory(dayIndex);
  }
  
  const dayMemory = dailyFoodMemory.get(dayIndex)!;
  
  // Extract individual food items from the description
  const foodPattern = /(\w+(?:\s+\w+)*)(?:\s*\([^)]*\))?/g;
  let match;
  
  while ((match = foodPattern.exec(foodDescription)) !== null) {
    const foodItem = match[1].trim().toLowerCase();
    if (foodItem.length < 3) continue; // Skip very short words
    
    // Extract the base food name without modifiers
    const baseName = extractBaseFoodName(foodItem);
    if (baseName.length < 2) continue; // Skip invalid items
    
    // Add to the day's memory
    dayMemory.add(baseName);
  }
};

/**
 * Check if a food item has been used already today
 * @param dayIndex The day index to check
 * @param foodItem The food item to check
 * @returns True if the food has already been used
 */
export const hasFoodBeenUsedToday = (dayIndex: number, foodItem: string): boolean => {
  // If no memory for this day, it hasn't been used
  if (!dailyFoodMemory.has(dayIndex)) {
    return false;
  }
  
  const dayMemory = dailyFoodMemory.get(dayIndex)!;
  const baseName = extractBaseFoodName(foodItem).toLowerCase();
  
  // Check if we've seen this food or a synonym already today
  return dayMemory.has(baseName) || hasSynonymInSeenFoods(baseName, dayMemory);
};
