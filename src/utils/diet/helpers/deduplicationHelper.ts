
/**
 * @deprecated This file is now deprecated. Use the functions from './deduplication' directly.
 * Keeping for backward compatibility.
 */

// Re-export the deduplication functions from the deduplication module
export {
  // Meal normalization functions
  removeDuplicateFoodItems,
  deduplicateMealDescription,
  normalizeMealForPDF,
  
  // Addition helpers
  addWithoutDuplication,
  
  // Detection functions
  hasFoodItem,
  extractBaseFoodName,
  detectDuplicateFoods,
  
  // Formatting functions
  formatForPDF,
  cleanupDuplicationFormatting,
  
  // Daily food memory functions
  resetDailyFoodMemory,
  addFoodToDailyMemory,
  hasFoodBeenUsedToday,
  
  // Synonym helpers
  hasSynonymInSeenFoods
} from './deduplication';
