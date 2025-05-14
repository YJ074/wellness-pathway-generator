
/**
 * Helper file that re-exports deduplication functions for backward compatibility
 * Serves as the main entry point for deduplication functionality
 */

// Re-export necessary functions from the modular system
export { 
  removeDuplicateFoodItems,
  normalizeMealForPDF
} from './deduplication/mealNormalization';

export { 
  addWithoutDuplication 
} from './deduplication/addition';

// Re-export additional functionality that might be needed
export { 
  hasFoodItem, 
  extractBaseFoodName 
} from './deduplication/detection';

export { 
  formatForPDF,
  cleanupDuplicationFormatting 
} from './deduplication/formatting';
