
import { hasFoodItem, extractBaseFoodName } from '../detection';
import { hasSynonymInSeenFoods } from '../synonyms';

/**
 * Removes duplicate food items from a meal description
 * 
 * @param mealDescription The original meal description
 * @returns A new meal description with duplicates removed
 */
export function removeDuplicateFoodItems(mealDescription: string): string {
  if (!mealDescription) return '';
  
  // Extract health benefit to process separately
  const benefitMatch = mealDescription.match(/ - \(([^)]+)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  // Remove health benefit for processing
  let cleanDescription = healthBenefit ? 
    mealDescription.replace(healthBenefit, '') : 
    mealDescription;
  
  // Split by commas, "with", "and", "or" conjunctions to analyze each part
  const parts = cleanDescription.split(/,\s*|\s+with\s+|\s+and\s+|\s+or\s+/);
  const seenItems = new Set<string>();
  const seenBaseFoods = new Set<string>();
  const result: string[] = [];
  
  for (const part of parts) {
    const cleanPart = part.trim();
    if (!cleanPart) continue;
    
    // Skip portions in parentheses when standalone
    if (cleanPart.startsWith('(') && cleanPart.endsWith(')')) continue;
    
    // Extract base food name for comparison
    const baseName = extractBaseFoodName(cleanPart.toLowerCase());
    if (!baseName || baseName.length < 2) continue;
    
    // Skip if we've already seen this food item or a synonym
    if (seenBaseFoods.has(baseName) || hasSynonymInSeenFoods(baseName, seenBaseFoods)) {
      continue;
    }
    
    // Add the base name to seen set and the original text to result
    seenBaseFoods.add(baseName);
    seenItems.add(cleanPart);
    result.push(cleanPart);
  }
  
  // Rejoin with appropriate conjunctions based on context
  let normalizedText = '';
  for (let i = 0; i < result.length; i++) {
    if (i === 0) {
      normalizedText = result[i];
    } else if (i === result.length - 1) {
      // Use "and" for the last item if there are more than 2 items
      if (result.length > 2) {
        normalizedText += `, and ${result[i]}`;
      } else {
        // Use just "and" for 2 items
        normalizedText += ` and ${result[i]}`;
      }
    } else {
      // Separate items with commas
      normalizedText += `, ${result[i]}`;
    }
  }
  
  // Reattach health benefit if present
  if (healthBenefit) {
    normalizedText += ` ${healthBenefit}`;
  }
  
  return normalizedText;
}
