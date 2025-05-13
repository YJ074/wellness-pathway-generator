
/**
 * Meal description normalization
 * Core functions for cleaning up meal descriptions and removing duplicates
 */

import { hasFoodItem } from './detection';
import { normalizeWhitespaceAndPunctuation, formatForPDF } from './formatting';
import { hasSynonymInSeenFoods } from './synonyms';

/**
 * Removes duplicate food items from a meal description
 * @param mealDescription The meal description to deduplicate
 * @returns A meal description with duplicates removed
 */
export const removeDuplicateFoodItems = (mealDescription: string): string => {
  if (!mealDescription) {
    return '';
  }
  
  // Split description into individual food items
  const items = mealDescription
    .split(/,\s*/)
    .map(item => item.trim())
    .filter(item => item !== '');
  
  const seenFoods = new Set<string>();
  const result: string[] = [];
  
  // Process each item
  for (const item of items) {
    // Skip if this item is empty after trimming
    if (item.trim().length === 0) {
      continue;
    }
    
    // Check for duplicate food using more sophisticated logic
    // Uses food name extraction and synonym matching
    let isDuplicate = false;
    
    // Check if this food or its synonym has been seen
    const lowerItem = item.toLowerCase();
    if (hasSynonymInSeenFoods(item, seenFoods)) {
      isDuplicate = true;
    } else {
      // Check for direct duplicates with different formatting
      isDuplicate = Array.from(seenFoods).some(seenFood => 
        hasFoodItem(item, seenFood) || hasFoodItem(seenFood, item)
      );
    }
    
    if (!isDuplicate) {
      seenFoods.add(lowerItem);
      result.push(item);
    }
  }
  
  // Join processed items back together with proper formatting
  return normalizeWhitespaceAndPunctuation(result.join(', '));
};

/**
 * Normalizes meal descriptions specifically for PDF output
 * More aggressive deduplication for cleaner presentation
 * @param mealDescription The meal description to normalize
 * @returns A normalized and deduplicated meal description
 */
export const normalizeMealForPDF = (mealDescription: string): string => {
  if (!mealDescription) {
    return '';
  }
  
  // First pass: general duplicate removal
  let normalizedText = removeDuplicateFoodItems(mealDescription);
  
  // Second pass: special case cleanup for PDFs
  normalizedText = normalizedText
    // Fix duplicate connectors (very common in meal descriptions)
    .replace(/\s+(and|with)\s+\1\s+/g, ' $1 ')
    // Fix repeated "with" statement
    .replace(/with\s+with/g, 'with')
    // Fix repeated "and" statement
    .replace(/and\s+and/g, 'and')
    // Remove duplicate items that appear with different formatting
    .replace(/(\w+(?:\s+\w+)*)\s*\([^)]+\)\s*(?:,|and|with)\s+\1\s*\([^)]+\)/gi, '$1 (portion)')
    // Handle seed items which are particularly prone to duplication
    .replace(/(\w+\s+seeds)\s*\([^)]+\)\s*(?:,|and|with)\s+\1\s*\([^)]+\)/gi, '$1 (portion)')
    // Handle spices which can appear with different preparations
    .replace(/(\w+)\s+powder\s*(?:,|and|with)\s+\1\s+/gi, '$1 powder, ')
    // Fix awkward punctuation that can result from deduplication
    .replace(/,\s*,/g, ',')
    .replace(/,\s*\./g, '.')
    // Normalize spaces once more
    .replace(/\s{2,}/g, ' ');
  
  // Final formatting for PDF presentation
  return formatForPDF(normalizedText);
};
