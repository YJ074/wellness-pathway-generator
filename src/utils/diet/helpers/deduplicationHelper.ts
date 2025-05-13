
/**
 * @deprecated This file is kept for backward compatibility. 
 * Use the new modular deduplication system from './deduplication/index.ts' instead.
 */

// Re-export all relevant functions from the new modular system
export {
  hasFoodItem,
  extractBaseFoodName,
  addWithoutDuplication,
  removeDuplicateFoodItems,
  normalizeMealForPDF,
  DEFAULT_OPTIONS
} from './deduplication';

// Legacy function preserved for backward compatibility
export const preventDuplicateAdditions = (description: string, addition: string): string => {
  return addWithoutDuplication(description, addition);
};
