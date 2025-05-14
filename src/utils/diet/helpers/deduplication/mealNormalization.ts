
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
 * Enhanced normalization for PDF rendering
 * More aggressive than the standard deduplication used for web display
 */
export function normalizeMealForPDF(mealDescription: string): string {
  if (!mealDescription) return '';
  
  // First remove duplicates using the standard approach
  let normalized = removeDuplicateFoodItems(mealDescription);
  
  // PDF-specific extra aggressive deduplication
  normalized = normalized
    // Deduplicate items with different portions
    .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Deduplicate with different cooking methods
    .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+\((?:grilled|roasted|boiled|steamed|baked|fried|sautéed)\)(?:[^,]*),(?:[^,]*)\1/gi, '$1')
    // Remove adjacent repeated items separated by connectors
    .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)[,\s]+(?:with|and|or)[,\s]+\1\b/gi, '$1')
    // Handle duplicate connectors
    .replace(/(?:with|and)[,\s]+(?:with|and)/gi, 'with')
    // Fix patterns like "with vegetable with vegetable"
    .replace(/with\s+([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+with\s+\1/gi, 'with $1')
    // Remove "and and" duplications
    .replace(/\band\s+and\b/gi, 'and')
    // Clean up spacing around commas and parentheses
    .replace(/\s+,\s*/g, ', ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')');
  
  // Handle synonyms
  Object.entries(FOOD_SYNONYMS).forEach(([primary, synonyms]) => {
    synonyms.forEach(synonym => {
      const synonymPattern = new RegExp(`\\b${synonym}\\b`, 'gi');
      normalized = normalized.replace(synonymPattern, primary);
    });
  });
  
  return normalized;
}
