
// Export functions from the duplicate remover
export { removeDuplicateFoodItems } from './duplicateRemover';

// Export functions from the PDF normalizer
export { normalizeMealForPDF } from './pdfNormalizer';

// Additional functions for meal normalization
export const deduplicateMealDescription = (mealDescription: string): string => {
  // Use the removeDuplicateFoodItems function for base implementation
  return removeDuplicateFoodItems(mealDescription);
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
