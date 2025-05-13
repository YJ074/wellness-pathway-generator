
import { addWithoutDuplication } from './addition';
import { detectFoodDuplications } from './detection';
import { formatMealWithDeduplication } from './formatting';
import { FOOD_SYNONYMS } from './synonyms';

/**
 * Removes duplicate food items from a meal description
 * by normalizing the text and handling different formats
 */
export function removeDuplicateFoodItems(mealDescription: string): string {
  if (!mealDescription || typeof mealDescription !== 'string') return mealDescription;
  
  let normalizedMeal = mealDescription;
  
  // Handle cooking methods with escaped parenthesis correctly
  // Fix: Ensure parentheses are properly escaped in regex patterns
  const cookingMethods = [
    'grilled',
    'roasted',
    'steamed',
    'boiled',
    'baked',
    'sautéed',
    'sauteed',
    'fried',
    'stir-fried'
  ];
  
  // Apply more specific replacements first
  cookingMethods.forEach(method => {
    // Fix the regex pattern - escape parentheses properly
    const methodWithPortionPattern = new RegExp(`\\(${method}\\)\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(methodWithPortionPattern, `(${method})`);
    
    // Fix the regex pattern - ensure correct escaping
    const redundantMethodPattern = new RegExp(`${method}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(redundantMethodPattern, method);
  });
  
  // Detect and handle duplications
  const duplications = detectFoodDuplications(normalizedMeal);
  
  // Format the meal with deduplication
  normalizedMeal = formatMealWithDeduplication(normalizedMeal, duplications);
  
  return normalizedMeal;
}

/**
 * Normalizes meal descriptions for PDF rendering
 * with enhanced formatting and deduplication
 */
export function normalizeMealForPDF(mealDescription: string): string {
  if (!mealDescription) return '';
  
  // First remove duplicates
  let normalized = removeDuplicateFoodItems(mealDescription);
  
  // Handle synonyms
  Object.entries(FOOD_SYNONYMS).forEach(([primary, synonyms]) => {
    synonyms.forEach(synonym => {
      const synonymPattern = new RegExp(`\\b${synonym}\\b`, 'gi');
      normalized = normalized.replace(synonymPattern, primary);
    });
  });
  
  return normalized;
}
