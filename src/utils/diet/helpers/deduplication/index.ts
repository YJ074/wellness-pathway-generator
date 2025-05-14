
/**
 * Food description deduplication module
 * Main entry point that re-exports all deduplication functionality
 */

// Re-export all public functions from the modules
export { hasFoodItem, extractBaseFoodName } from './detection';
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

