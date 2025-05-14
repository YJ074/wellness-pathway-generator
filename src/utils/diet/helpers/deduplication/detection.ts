
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
  
  // Check for exact matches with word boundaries
  const exactRegex = new RegExp(`\\b${baseFoodName}\\b`, 'i');
  if (exactRegex.test(processedMealDescription)) {
    return true;
  }
  
  // Check for plural/singular variations with word boundaries
  const pluralVariation = baseFoodName.endsWith('s') ? 
    baseFoodName.slice(0, -1) : 
    `${baseFoodName}s`;
  
  const pluralRegex = new RegExp(`\\b${pluralVariation}\\b`, 'i');
  if (pluralRegex.test(processedMealDescription)) {
    return true;
  }
  
  // Check for synonyms
  const synonyms = getSynonymsForFood(baseFoodName);
  for (const synonym of synonyms) {
    const synonymRegex = new RegExp(`\\b${synonym}\\b`, 'i');
    if (synonymRegex.test(processedMealDescription)) {
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
    .replace(/\d+\s*(?:g|ml|katori|cup|glass|chamach|slice|pieces?|tbsp|tsp|nos|handful)/gi, '') // Remove measurements
    .replace(/small|medium|large|diced|chopped|sliced|raw|cooked/gi, '') // Remove modifiers
    .replace(/mixed|assorted|varied|fresh|boiled|steamed|grilled|roasted/gi, '') // Additional modifiers
    .replace(/\s+/g, ' ')            // Normalize spaces
    .trim();
};

/**
 * Detects duplicate food items in a meal description
 * @param mealDescription The meal description to analyze
 * @returns Array of detected duplicate food names
 */
export const detectDuplicateFoods = (mealDescription: string): string[] => {
  const foodPattern = /(\w+(?:\s+\w+)*)(?:\s*\([^)]*\))?/g;
  const seenItems = new Set<string>();
  const duplicates = new Set<string>();
  let match;
  
  while ((match = foodPattern.exec(mealDescription)) !== null) {
    const foodItem = match[1].trim().toLowerCase();
    if (foodItem.length < 3) continue; // Skip very short words
    
    const baseName = extractBaseFoodName(foodItem);
    if (baseName.length < 2) continue; // Skip invalid items
    
    // Check if we've seen this food before
    if (seenItems.has(baseName) || hasSynonymInSeenFoods(baseName, seenItems)) {
      duplicates.add(baseName);
    } else {
      seenItems.add(baseName);
    }
  }
  
  return Array.from(duplicates);
};
