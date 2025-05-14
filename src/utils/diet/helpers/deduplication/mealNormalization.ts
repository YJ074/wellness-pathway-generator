
import { hasFoodItem, extractBaseFoodName } from './detection';
import { cleanupDuplicationFormatting } from './formatting';

/**
 * Removes duplicate food items from a meal description
 * 
 * @param mealDescription The original meal description
 * @returns A new meal description with duplicates removed
 */
export function removeDuplicateFoodItems(mealDescription: string): string {
  if (!mealDescription) return '';
  
  // Split by commas and analyze each part
  const parts = mealDescription.split(/,\s*/);
  const seenItems = new Set<string>();
  const result: string[] = [];
  
  for (const part of parts) {
    const baseName = extractBaseFoodName(part.toLowerCase().trim());
    
    // Skip if we've already seen this food item
    if (seenItems.has(baseName)) continue;
    
    // Add base name to seen set and original text to result
    seenItems.add(baseName);
    result.push(part.trim());
  }
  
  // Rejoin with commas
  return result.join(', ');
}

/**
 * More aggressive normalization for PDF output to avoid duplication
 * 
 * @param mealDescription The original meal description
 * @returns A cleaner meal description for PDF output
 */
export function normalizeMealForPDF(mealDescription: string): string {
  if (!mealDescription) return '';
  
  let normalizedText = mealDescription;
  
  // Perform initial deduplication
  normalizedText = removeDuplicateFoodItems(normalizedText);
  
  // Additional cleaning passes for PDF formatting
  normalizedText = cleanupDuplicationFormatting(normalizedText);
  
  // Fix common style issues that appear in PDFs
  normalizedText = normalizedText
    // Remove double spaces
    .replace(/\s{2,}/g, ' ')
    // Ensure comma spacing
    .replace(/,(?!\s)/g, ', ')
    // Fix dash spacing
    .replace(/\s-\s/g, ' - ')
    // Fix parenthesis spacing
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    // Fix overuse of "and" or "with"
    .replace(/(\s(?:and|with)\s)(?:and|with)\s/gi, '$1');
    
  return normalizedText;
}
