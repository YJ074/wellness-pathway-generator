
// Export functions from the duplicate remover
export { removeDuplicateFoodItems } from './duplicateRemover';

// Export functions from the PDF normalizer
export { normalizeMealForPDF } from './pdfNormalizer';

// Export functions from the daily deduplicator
export { 
  resetDailyFoodMemory,
  addFoodToDailyMemory,
  hasFoodBeenUsedToday 
} from './dailyDeduplicator';

// Additional functions for meal normalization
export const deduplicateMealDescription = (mealDescription: string): string => {
  // Import the removeDuplicateFoodItems function for use in this function
  const { removeDuplicateFoodItems: removeDupes } = require('./duplicateRemover');
  // Use the imported function for base implementation
  return removeDupes(mealDescription);
};

export const removeDuplicateOptions = (options: string[]): string[] => {
  // Remove duplicates from an array of options
  const uniqueOptions = new Set<string>();
  const result: string[] = [];
  
  for (const option of options) {
    // Normalize the option for comparison
    const normalizedOption = option.toLowerCase().trim();
    if (!uniqueOptions.has(normalizedOption)) {
      uniqueOptions.add(normalizedOption);
      result.push(option); // Add the original (non-normalized) option
    }
  }
  
  return result;
};
