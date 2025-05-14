
/**
 * Food item detection functionality
 * Handles detection of food items in meal descriptions
 */

export interface DuplicateDetectionOptions {
  caseSensitive: boolean;
  strictMatching: boolean;
}

export const DEFAULT_OPTIONS: DuplicateDetectionOptions = {
  caseSensitive: false,
  strictMatching: false
};

// Dictionary of known synonyms for specific food items
import { FOOD_SYNONYMS, getSynonymsForFood, hasSynonymInSeenFoods } from './synonyms';

/**
 * Checks if a food item is already present in a meal description
 * @param mealDescription The meal description to search in
 * @param foodItem The food item to search for
 * @param options Optional configuration for the search
 * @returns True if the food item is found in the description
 */
export const hasFoodItem = (
  mealDescription: string,
  foodItem: string,
  options: Partial<DuplicateDetectionOptions> = {}
): boolean => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  
  // Process inputs based on case sensitivity
  const processedMealDescription = finalOptions.caseSensitive ? 
    mealDescription : 
    mealDescription.toLowerCase();
  
  const processedFoodItem = finalOptions.caseSensitive ? 
    foodItem : 
    foodItem.toLowerCase();
  
  // Extract base name for matching (removing portions, etc.)
  const baseFoodName = extractBaseFoodName(processedFoodItem);
  
  // Check for exact matches, handling plurality variations
  if (processedMealDescription.includes(baseFoodName)) {
    return true;
  }
  
  // Check for plural/singular variations
  const pluralVariation = baseFoodName.endsWith('s') ? 
    baseFoodName.slice(0, -1) : 
    `${baseFoodName}s`;
  
  if (processedMealDescription.includes(pluralVariation)) {
    return true;
  }
  
  // Check for synonyms
  const synonyms = getSynonymsForFood(baseFoodName);
  for (const synonym of synonyms) {
    if (processedMealDescription.includes(synonym)) {
      return true;
    }
  }
  
  return false;
};

/**
 * Extracts the base name of a food item by removing common modifiers
 * @param foodItem The food item string
 * @returns The base name of the food item
 */
export const extractBaseFoodName = (foodItem: string): string => {
  return foodItem
    .replace(/\([^)]*\)/g, '')       // Remove parenthetical portions
    .replace(/\d+\s*(?:g|ml|katori|cup|glass|chamach|slice|pieces?|tbsp)/gi, '') // Remove measurements
    .replace(/small|medium|large|diced|chopped|sliced|raw|cooked/gi, '') // Remove modifiers
    .trim();
};
