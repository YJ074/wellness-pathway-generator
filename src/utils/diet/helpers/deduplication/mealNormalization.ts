
import { hasFoodItem, extractBaseFoodName } from './detection';
import { cleanupDuplicationFormatting } from './formatting';
import { hasSynonymInSeenFoods } from './synonyms';

/**
 * Removes duplicate food items from a meal description
 * 
 * @param mealDescription The original meal description
 * @returns A new meal description with duplicates removed
 */
export function removeDuplicateFoodItems(mealDescription: string): string {
  if (!mealDescription) return '';
  
  // Split by commas, "with", "and" conjunctions to analyze each part
  const parts = mealDescription.split(/,\s*|\s+with\s+|\s+and\s+/);
  const seenItems = new Set<string>();
  const result: string[] = [];
  
  for (const part of parts) {
    const cleanPart = part.trim();
    if (!cleanPart) continue;
    
    const baseName = extractBaseFoodName(cleanPart.toLowerCase());
    
    // Skip if we've already seen this food item or a synonym
    if (seenItems.has(baseName) || hasSynonymInSeenFoods(baseName, seenItems)) continue;
    
    // Add base name to seen set and original text to result
    seenItems.add(baseName);
    result.push(cleanPart);
  }
  
  // Rejoin with appropriate conjunctions based on context
  let normalizedText = '';
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      normalizedText = result[i];
    } else if (i === result.length - 1) {
      // Use "and" for the last item
      normalizedText += `, and ${result[i]}`;
    } else {
      // Use commas for other items
      normalizedText += `, ${result[i]}`;
    }
  }
  
  return normalizedText;
}

/**
 * More aggressive normalization for PDF output to avoid duplication
 * Specifically designed to handle the complex breakfast descriptions
 * 
 * @param mealDescription The original meal description
 * @returns A cleaner meal description for PDF output
 */
export function normalizeMealForPDF(mealDescription: string): string {
  if (!mealDescription) return '';
  
  let normalizedText = mealDescription;
  
  // First, remove the health benefit if present, to process separately
  const benefitMatch = normalizedText.match(/ - \(([^)]+)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  if (healthBenefit) {
    normalizedText = normalizedText.replace(healthBenefit, '');
  }
  
  // Handle common repetition patterns in breakfast items
  normalizedText = normalizedText
    // Fix repeated "with X" phrases
    .replace(/with\s+([^,]+)(?:,|\s+and|\s+with)\s+with\s+\1/gi, 'with $1')
    // Fix repeated ingredients with portions
    .replace(/(\w+)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated seeds with different portions
    .replace(/(\w+\s+seeds)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated nuts with different portions
    .replace(/(\w+)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)');
  
  // Apply the main deduplication algorithm
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
    .replace(/(\s(?:and|with)\s)(?:and|with)\s/gi, '$1')
    // Fix repeated phrases with "and" or "with"
    .replace(/(\w+(?:\s+\w+)*)\s+and\s+\1/gi, '$1')
    .replace(/(\w+(?:\s+\w+)*)\s+with\s+\1/gi, '$1');
    
  // Reattach the health benefit
  if (healthBenefit) {
    normalizedText = `${normalizedText} ${healthBenefit}`;
  }
  
  return normalizedText;
}
