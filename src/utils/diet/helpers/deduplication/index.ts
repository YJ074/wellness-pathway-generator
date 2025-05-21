
// Export normalized meal functionality 
export { deduplicateMealDescription, removeDuplicateOptions, removeDuplicateFoodItems } from './mealNormalization';
export { detectDuplication, detectDuplicateFoods, hasFoodItem, extractBaseFoodName } from './detection';
export { applyTriplePassDeduplication, formatForPDF, cleanupDuplicationFormatting } from './formatting';

// Export daily food tracking functions
export { 
  resetDailyFoodMemory,
  addFoodToDailyMemory,
  hasFoodBeenUsedToday
} from './mealNormalization/dailyDeduplicator';

// Export helper functions for addition and synonym handling
export { addWithoutDuplication } from './addition';
export { hasSynonymInSeenFoods } from './synonyms';

// Also export the PDF-specific normalizer for enhanced deduplication in PDFs
export { normalizeMealForPDF } from './mealNormalization/pdfNormalizer';
