
/**
 * Helper file that re-exports deduplication functions for backward compatibility
 * Serves as the main entry point for deduplication functionality
 */

// Re-export necessary functions from the modular system
export { 
  removeDuplicateFoodItems,
  normalizeMealForPDF,
  applyTriplePassDeduplication
} from './deduplication';

export { 
  addWithoutDuplication 
} from './deduplication';

// Re-export additional functionality that might be needed
export { 
  hasFoodItem, 
  extractBaseFoodName,
  detectDuplicateFoods
} from './deduplication';

export { 
  formatForPDF,
  cleanupDuplicationFormatting 
} from './deduplication';

// Export any additional utilities needed
export { hasSynonymInSeenFoods } from './deduplication';
