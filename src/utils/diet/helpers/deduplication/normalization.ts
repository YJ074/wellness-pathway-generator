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
    
    // Enhanced pattern for exact duplications like the ones in the screenshot
    const exactDuplication = new RegExp(`(${food}\\s+\\([^)]+\\))(?:[^,]*),(?:[^,]*)(${food}\\s+\\([^)]+\\))`, 'gi');
    normalizedMeal = normalizedMeal.replace(exactDuplication, '$1');
    
    // Handle direct repetitions like "Chickoo (1 nos), Chickoo (1 nos)"
    const directRepetition = new RegExp(`${food}\\s+\\([^)]+\\)(?:,\\s*|\\s+)${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(directRepetition, `${food} ([^)]+)`);
    
    // NEW: Super aggressive pattern to catch any repetition of the food with the same portion
    // This will find "with X (portion)" anywhere and remove duplicates
    const ultraAggressivePattern = new RegExp(`with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    let matches = normalizedMeal.match(ultraAggressivePattern);
    if (matches && matches.length > 1) {
      // Keep only the first occurrence
      for (let i = 1; i < matches.length; i++) {
        normalizedMeal = normalizedMeal.replace(matches[i], '');
      }
    }
    
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
  
  // Special handling for exact duplications of the same item with same portion
  // This catches cases like "chia seeds (1 tsp), chia seeds (1 tsp)"
  const exactDuplicatePattern = /(\b[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\([^)]+\)),\s+\1/gi;
  normalizedMeal = normalizedMeal.replace(exactDuplicatePattern, '$1');
  
  // Enhanced complex sequence detection - finds repetitive sequences of food items
  // This should catch the pattern seen in the screenshot
  const complexSequencePattern = /([A-Za-z]+(?:\s+[A-Za-z]+)*\s+\([^)]+\)[^,]*,[^,]*[A-Za-z]+(?:\s+[A-Za-z]+)*\s+\([^)]+\)[^,]*),\s+\1/g;
  normalizedMeal = normalizedMeal.replace(complexSequencePattern, '$1');
  
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
  // First apply the standard duplicate removal
  let normalizedMeal = removeDuplicateFoodItems(mealDescription);
  
  // Now use a more thorough approach with a food registry
  const seenFoods = new Set<string>();
  const parts: string[] = [];
  
  // Instead of simple comma splitting, handle more complex patterns
  // Split by various connectors: commas, "with", and "and"
  const foodFragments: string[] = [];
  let currentFragment = '';
  let insideParens = false;
  
  // First extract potential food items more carefully
  for (let i = 0; i < normalizedMeal.length; i++) {
    const char = normalizedMeal[i];
    
    if (char === '(') {
      insideParens = true;
      currentFragment += char;
    } else if (char === ')') {
      insideParens = false;
      currentFragment += char;
    } else if ((char === ',' || 
               (char === 'w' && normalizedMeal.substr(i, 5) === 'with ') || 
               (char === 'a' && normalizedMeal.substr(i, 4) === 'and ')) && 
               !insideParens) {
      // We found a separator outside parentheses
      if (currentFragment.trim()) {
        foodFragments.push(currentFragment.trim());
      }
      
      // Skip the connector word
      if (char === 'w') {
        i += 4; // Skip "with "
      } else if (char === 'a') {
        i += 3; // Skip "and "
      }
      
      currentFragment = '';
    } else {
      currentFragment += char;
    }
  }
  
  // Add the final fragment
  if (currentFragment.trim()) {
    foodFragments.push(currentFragment.trim());
  }
  
  // Now process each food fragment
  for (const fragment of foodFragments) {
    // Extract the food name from the fragment
    let foodName = fragment;
    const portionMatch = fragment.match(/^([^(]+)\s*\([^)]+\)/);
    
    if (portionMatch && portionMatch[1]) {
      foodName = portionMatch[1].trim().toLowerCase();
    }
    
    // If this food or its synonyms haven't been seen before, add it
    if (!seenFoods.has(foodName) && !hasSynonymInSeenFoods(foodName, seenFoods)) {
      parts.push(fragment);
      seenFoods.add(foodName);
    }
  }
  
  // Join the unique parts with appropriate connectors based on context
  normalizedMeal = '';
  for (let i = 0; i < parts.length; i++) {
    if (i === 0) {
      normalizedMeal = parts[i];
    } else if (i === parts.length - 1 && parts.length > 2) {
      // Use "and" for the last item in a list of 3+ items
      normalizedMeal += `, and ${parts[i]}`;
    } else if (i === parts.length - 1) {
      // Use "and" for the last item in a list of 2 items
      normalizedMeal += ` and ${parts[i]}`;
    } else {
      // Use comma for middle items
      normalizedMeal += `, ${parts[i]}`;
    }
  }
  
  // Replace "with" connectors more consistently - only keep the first "with"
  normalizedMeal = normalizedMeal.replace(/\b(with)\b/gi, (match, p1, offset) => {
    return offset > 30 ? 'and' : match; // Keep first "with", replace others with "and"
  });
  
  // Final cleanups to fix spacing and formatting
  return formatForPDF(normalizedMeal);
};
