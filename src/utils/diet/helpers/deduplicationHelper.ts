
/**
 * Helper file that re-exports deduplication functions for backward compatibility
 */

export { 
  removeDuplicateFoodItems,
  normalizeMealForPDF 
} from './deduplication/mealNormalization';

export { 
  addWithoutDuplication 
} from './deduplication/addition';
