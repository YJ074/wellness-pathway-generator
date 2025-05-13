
/**
 * Meal description normalization module
 * Provides functions to remove duplicates and normalize meal descriptions
 */

import { hasFoodItem } from './detection';
import { formatAddition, normalizeWhitespaceAndPunctuation, cleanupDuplicationFormatting, formatForPDF } from './formatting';
import { FOOD_SYNONYMS, hasSynonymInSeenFoods } from './synonyms';
import { extractBaseFoodName } from './detection';

// Common food items that frequently get duplicated
const COMMON_FOODS = [
  "Chickoo", "cashews", "chia seeds", "flax seeds", "almonds", 
  "walnuts", "sprouts", "Dandelion Greens", "peanuts", "yogurt", 
  "curd", "dahi", "kombucha", "kefir", "buttermilk", "chaas",
  "sunflower seeds", "pumpkin seeds", "sesame seeds",
  "Banana", "Apple", "Mango", "Orange", "Papaya", "Watermelon",
  "Grapes", "Pomegranate", "Kiwi", "Berries", "Strawberries",
  "Blueberries", "Raspberries", "Blackberries", "Pineapple",
  "Guava", "Litchi", "Jackfruit", "Sapota", "Custard Apple",
  // Include common cereals and other items
  "oats", "poha", "daliya", "upma", "idli", "dosa", "roti", "paratha",
  "millet", "rice", "quinoa", "barley", "corn", 
  // Add more common items
  "paneer", "cottage cheese", "tofu", "tempeh", "chickpeas", "chana",
  "beans", "lentils", "dal", "egg", "anda", "milk", "doodh"
];

/**
 * Adds an item to a meal description, ensuring no duplication
 * @param mealDescription The current meal description
 * @param addition The item to add
 * @returns Updated meal description with addition (if not already present)
 */
export const addWithoutDuplication = (
  mealDescription: string,
  addition: string
): string => {
  // Don't add if it's already there
  if (hasFoodItem(mealDescription, addition)) {
    return mealDescription;
  }
  
  // Add with proper formatting
  return formatAddition(mealDescription, addition);
};

/**
 * Normalizes a meal description by removing duplicated food items
 * @param mealDescription The meal description to normalize
 * @returns Cleaned meal description with duplicates removed
 */
export const removeDuplicateFoodItems = (mealDescription: string): string => {
  // Start with basic whitespace normalization
  let normalizedMeal = normalizeWhitespaceAndPunctuation(mealDescription);
  
  // Specific fix for repeated item sequences with portions
  const repeatedItemsPattern = /([A-Za-z]+ +\([^)]+\)),( *\1)+/g;
  normalizedMeal = normalizedMeal.replace(repeatedItemsPattern, '$1');
  
  // Process each food item and remove duplicates
  for (const food of COMMON_FOODS) {
    const lowerFood = food.toLowerCase();
    
    // Handle "with X (portion), with X (portion)" pattern
    // This catches the most common duplication pattern
    const withWithPattern = new RegExp(`(with\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(withWithPattern, '$1');
    
    // Handle "and X (portion), and X (portion)" pattern
    const andAndPattern = new RegExp(`(and\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(andAndPattern, '$1');
    
    // Handle mixed connectors: "with X (portion), and X (portion)" pattern
    const withAndPattern = new RegExp(`(with\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(withAndPattern, '$1');
    
    // Handle "and X (portion), with X (portion)" pattern
    const andWithPattern = new RegExp(`(and\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(andWithPattern, '$1');
    
    // More aggressive pattern - anything with this food regardless of connector
    const anyPattern = new RegExp(`((?:with|and)\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and)\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(anyPattern, '$1');
    
    // Handle standalone duplicates (no connector)
    const standalonePattern = new RegExp(`(${food}\\s+\\([^)]+\\)[^,]*),\\s*${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(standalonePattern, '$1');
    
    // NEW: Handle direct repetitions like "Chickoo (1 nos), Chickoo (1 nos)"
    const directRepetition = new RegExp(`${food}\\s+\\([^)]+\\)(?:,\\s*|\\s+)${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(directRepetition, `${food} ([^)]+)`);
    
    // Handle duplicates across synonyms
    // First get potential synonyms for this food
    const synonyms = FOOD_SYNONYMS[food.toLowerCase()] || [];
    for (const synonym of synonyms) {
      // Check patterns with synonyms
      const synonymPattern = new RegExp(`((?:with|and|,|^)\\s*${food}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and|,)\\s*${synonym}\\s+\\([^)]+\\)`, 'gi');
      normalizedMeal = normalizedMeal.replace(synonymPattern, '$1');
      
      // Reverse direction (synonym first, then food)
      const reverseSynonymPattern = new RegExp(`((?:with|and|,|^)\\s*${synonym}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and|,)\\s*${food}\\s+\\([^)]+\\)`, 'gi');
      normalizedMeal = normalizedMeal.replace(reverseSynonymPattern, '$1');
    }
  }
  
  // Check for minimal food repetitions (e.g., "apple and apple")
  COMMON_FOODS.forEach(food => {
    const repeatedFoodPattern = new RegExp(`\\b${food}\\b[^,]*(,|\\s+and|\\s+with)\\s*\\b${food}\\b`, 'gi');
    normalizedMeal = normalizedMeal.replace(repeatedFoodPattern, (match, p1) => {
      return match.replace(new RegExp(`(,|\\s+and|\\s+with)\\s*\\b${food}\\b`, 'gi'), '');
    });
  });
  
  // NEW: Special handling for exact duplications of the same item with same portion
  // This catches cases like "chia seeds (1 tsp), chia seeds (1 tsp)"
  const exactDuplicatePattern = /(\b[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\([^)]+\)),\s+\1/gi;
  normalizedMeal = normalizedMeal.replace(exactDuplicatePattern, '$1');
  
  // Cleanup formatting after deduplication
  return cleanupDuplicationFormatting(normalizedMeal);
};

/**
 * Prepare a meal description for PDF rendering by ensuring no duplicates
 * and proper formatting of all food items
 * @param mealDescription The meal description to clean
 * @returns Fully normalized meal description 
 */
export const normalizeMealForPDF = (mealDescription: string): string => {
  // First remove duplicates
  let normalizedMeal = removeDuplicateFoodItems(mealDescription);
  
  // Perform another pass to catch missed duplicates by checking
  // fragments split by commas, "and", "with"
  const fragments = normalizedMeal.split(/(?:,|\s+and\s+|\s+with\s+)/);
  if (fragments.length > 1) {
    const uniqueFragments = [];
    const seenFoods = new Set<string>();
    
    for (const fragment of fragments) {
      // Extract food name from fragment
      const cleanFragment = fragment.trim();
      const foodNameMatch = cleanFragment.match(/^([a-zA-Z\s]+?)(?:\s+\(|\s*$)/);
      const foodName = foodNameMatch ? foodNameMatch[1].trim().toLowerCase() : cleanFragment.toLowerCase();
      
      if (!seenFoods.has(foodName)) {
        // Check for synonyms in the seen foods set
        const isDuplicate = hasSynonymInSeenFoods(foodName, seenFoods);
        
        if (!isDuplicate) {
          uniqueFragments.push(cleanFragment);
          seenFoods.add(foodName);
        }
      }
    }
    
    // Rebuild the string with proper connectors
    if (uniqueFragments.length > 0) {
      normalizedMeal = uniqueFragments.join(', ');
    }
  }
  
  // Additional PDF-specific normalization
  return formatForPDF(normalizedMeal);
};
