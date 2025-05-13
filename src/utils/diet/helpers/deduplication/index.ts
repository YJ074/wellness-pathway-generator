
/**
 * Food description deduplication module
 * Main entry point that re-exports all deduplication functionality
 */

// Re-export all public functions from the modules
export { hasFoodItem, extractBaseFoodName } from './detection';
export type { DuplicateDetectionOptions } from './detection';
export { DEFAULT_OPTIONS } from './detection';
export { addWithoutDuplication, removeDuplicateFoodItems, normalizeMealForPDF } from './normalization';
export { FOOD_SYNONYMS, getSynonymsForFood } from './synonyms';

// The original deduplicationHelper.ts functionality is now distributed across these more focused files:
// - detection.ts: Functions for detecting food items in text
// - normalization.ts: Functions for removing duplicates and normalizing meal descriptions
// - formatting.ts: Utilities for text formatting and cleanup
// - synonyms.ts: Food synonym definitions and related functions
// - index.ts: This file, which re-exports the public API
