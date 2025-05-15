
/**
 * Meal normalization module
 * 
 * This is the main entry point for the meal normalization functionality.
 * It re-exports all functions from the individual modules.
 */

export { removeDuplicateFoodItems } from './duplicateRemover';
export { deduplicateMealWithDailyContext } from './dailyDeduplicator';
export { normalizeMealForPDF } from './pdfNormalizer';
