
/**
 * Food item detection module
 * Provides functionality to detect and match food items in meal descriptions
 */

import { FOOD_SYNONYMS, getSynonymsForFood } from './synonyms';

export type DuplicateDetectionOptions = {
  caseSensitive?: boolean;
  checkConnectors?: boolean;
  handlePortionVariations?: boolean;
  checkSynonyms?: boolean;
  strictMatching?: boolean; // Added strict matching option
};

export const DEFAULT_OPTIONS: DuplicateDetectionOptions = {
  caseSensitive: false,
  checkConnectors: true,
  handlePortionVariations: true,
  checkSynonyms: true,
  strictMatching: false
};

/**
 * Extracts the base food name from a food item string
 * Removes portion information and descriptors
 */
export const extractBaseFoodName = (foodItem: string): string => {
  const foodNameMatch = foodItem.match(/^([a-z\s]+?)(?:\s+\(|\s*$)/i);
  return foodNameMatch ? foodNameMatch[1].trim() : foodItem;
};

/**
 * Checks if a food item already exists in a meal description
 * Handles variations with different connectors (with, and)
 * @param mealDescription The full meal description
 * @param foodItem The food item to check for
 * @param options Configuration options for duplicate detection
 * @returns True if the food item appears to already be present
 */
export const hasFoodItem = (
  mealDescription: string,
  foodItem: string,
  options: DuplicateDetectionOptions = DEFAULT_OPTIONS
): boolean => {
  const { caseSensitive, checkConnectors, handlePortionVariations, checkSynonyms, strictMatching } = { ...DEFAULT_OPTIONS, ...options };
  
  // Normalize text based on case sensitivity option
  const processedMeal = caseSensitive ? mealDescription : mealDescription.toLowerCase();
  const processedFood = caseSensitive ? foodItem : foodItem.toLowerCase();
  
  // Simple exact match check
  if (processedMeal.includes(processedFood)) {
    return true;
  }
  
  // Extract just the food name without portions or descriptors
  const foodName = extractBaseFoodName(processedFood);
  
  // With strict matching, we use word boundaries to prevent partial matches
  if (strictMatching) {
    const strictRegex = new RegExp(`\\b${foodName}\\b`, 'i');
    if (strictRegex.test(processedMeal)) {
      return true;
    }
  }
  
  // Check for food name with different connectors
  if (checkConnectors) {
    // Check for common connector patterns: "with X", "and X", "X and", "X with"
    if (
      processedMeal.includes(`with ${foodName}`) ||
      processedMeal.includes(`and ${foodName}`) ||
      processedMeal.includes(`${foodName} and`) ||
      processedMeal.includes(`${foodName} with`) ||
      processedMeal.includes(`${foodName},`) ||
      processedMeal.includes(`, ${foodName}`)
    ) {
      return true;
    }
  }
  
  // Check for portion variations if enabled
  if (handlePortionVariations) {
    // Match food with any portion description: "foodName (any portion)"
    const portionPattern = new RegExp(`${foodName}\\s+\\([^)]+\\)`, 'i');
    if (portionPattern.test(processedMeal)) {
      return true;
    }
    
    // Also check for food name followed by numbers (likely portions)
    const numberPortionPattern = new RegExp(`${foodName}\\s+\\d+`, 'i');
    if (numberPortionPattern.test(processedMeal)) {
      return true;
    }
  }
  
  // Check for synonyms if enabled
  if (checkSynonyms) {
    // Get all possible synonyms for this food
    const synonyms = getSynonymsForFood(foodName);
    
    // Check if any synonym exists in the meal
    for (const synonym of synonyms) {
      if (processedMeal.includes(synonym.toLowerCase())) {
        return true;
      }
      
      // Also check with connectors if that option is enabled
      if (checkConnectors) {
        if (
          processedMeal.includes(`with ${synonym.toLowerCase()}`) ||
          processedMeal.includes(`and ${synonym.toLowerCase()}`) ||
          processedMeal.includes(`${synonym.toLowerCase()} and`) ||
          processedMeal.includes(`${synonym.toLowerCase()} with`)
        ) {
          return true;
        }
      }
      
      // Check for portions with synonyms if that option is enabled
      if (handlePortionVariations) {
        const synonymPortionPattern = new RegExp(`${synonym}\\s+\\([^)]+\\)`, 'i');
        if (synonymPortionPattern.test(processedMeal)) {
          return true;
        }
      }
    }
  }
  
  return false;
};
