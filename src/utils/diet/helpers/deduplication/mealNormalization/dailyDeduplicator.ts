
import { extractBaseFoodName } from '../detection';
import { hasSynonymInSeenFoods } from '../synonyms';
import { cleanupDuplicationFormatting } from '../formatting';

/**
 * Enhanced food deduplication for meals across a day
 * Keeps track of food items to prevent repetition
 * 
 * @param mealDescription The original meal description
 * @param seenFoods Set of food items already seen in the day
 * @returns A cleaned meal description with day-level deduplication
 */
export function deduplicateMealWithDailyContext(
  mealDescription: string,
  seenFoods: Set<string>
): { text: string; addedFoods: string[] } {
  if (!mealDescription) return { text: '', addedFoods: [] };

  // Extract health benefit to process separately
  const benefitMatch = mealDescription.match(/ - \(([^)]+)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  // Remove health benefit for processing
  let cleanDescription = healthBenefit ? 
    mealDescription.replace(healthBenefit, '') : 
    mealDescription;
  
  // Split by commas, "with", "and", "or" conjunctions to analyze each part
  const parts = cleanDescription.split(/,\s*|\s+with\s+|\s+and\s+|\s+or\s+/);
  const newlyAddedFoods: string[] = [];
  const result: string[] = [];
  
  for (const part of parts) {
    const cleanPart = part.trim();
    if (!cleanPart) continue;
    
    // Skip portions in parentheses when standalone
    if (cleanPart.startsWith('(') && cleanPart.endsWith(')')) continue;
    
    // Extract base food name for comparison
    const baseName = extractBaseFoodName(cleanPart.toLowerCase());
    if (!baseName || baseName.length < 2) continue;
    
    // Skip if we've already seen this food item or a synonym in the day
    if (seenFoods.has(baseName) || hasSynonymInSeenFoods(baseName, seenFoods)) {
      continue;
    }
    
    // Add the base name to seen foods and the original text to result
    seenFoods.add(baseName);
    newlyAddedFoods.push(baseName);
    result.push(cleanPart);
  }
  
  // If everything was filtered out (all duplicates), return a generic placeholder
  if (result.length === 0) {
    return { 
      text: `Assorted seasonal vegetables and protein (as per dietary preference)${healthBenefit || ''}`,
      addedFoods: ['vegetables', 'protein'] 
    };
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
  
  return { 
    text: normalizedText,
    addedFoods: newlyAddedFoods
  };
}
