
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
    if (seenBaseFoods.has(baseName) || hasSynonymInSeenFoods(baseName, Array.from(seenBaseFoods))) {
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
      // Use commas for other items
      normalizedText += `, ${result[i]}`;
    }
  }
  
  // Reattach health benefit if present
  if (healthBenefit) {
    normalizedText += ` ${healthBenefit}`;
  }
  
  return normalizedText;
}

/**
 * More aggressive normalization for PDF output to avoid duplication
 * Specifically designed to handle the complex meal descriptions
 * 
 * @param mealDescription The original meal description
 * @returns A cleaner meal description for PDF output
 */
export function normalizeMealForPDF(mealDescription: string): string {
  if (!mealDescription) return '';
  
  let normalizedText = mealDescription;
  
  // Extract the health benefit if present, to process separately
  const benefitMatch = normalizedText.match(/ - \(([^)]+)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  if (healthBenefit) {
    normalizedText = normalizedText.replace(healthBenefit, '');
  }
  
  // First, handle specified portions with quantities
  // This regex matches food items with portions in parentheses
  const foodItemRegex = /(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s*\(([^)]+)\)/g;
  const foodItems = new Map<string, string>();
  let match;
  
  // First pass: collect all food items with their portions
  while ((match = foodItemRegex.exec(normalizedText)) !== null) {
    const [fullMatch, foodName, portion] = match;
    const cleanName = foodName.toLowerCase().trim();
    
    // Store the first occurrence of each food item
    if (!foodItems.has(cleanName)) {
      foodItems.set(cleanName, fullMatch);
    }
  }
  
  // Second pass: remove duplicates, keeping only the first occurrence
  foodItems.forEach((fullItem, foodName) => {
    // Create a regex that matches this food item with any portion
    const duplicateRegex = new RegExp(`${foodName}\\s*\\([^)]+\\)`, 'gi');
    let firstOccurrence = true;
    
    normalizedText = normalizedText.replace(duplicateRegex, (match) => {
      if (firstOccurrence) {
        firstOccurrence = false;
        return match; // Keep the first occurrence
      }
      return ''; // Remove subsequent occurrences
    });
  });
  
  // Handle common repetition patterns in meal items
  normalizedText = normalizedText
    // Fix repeated "with X" phrases
    .replace(/with\s+([^,]+)(?:,|\s+and|\s+with)\s+with\s+\1/gi, 'with $1')
    // Fix repeated ingredients with portions
    .replace(/(\w+(?:\s+\w+)*)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated seeds with different portions
    .replace(/(\w+\s+seeds)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated nuts with different portions
    .replace(/(\w+\s+nuts)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated fruits with different portions
    .replace(/(\w+\s+fruit)\s+\([^)]+\)(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Fix repeated specific foods that commonly cause problems
    .replace(/(\b(?:chickoo|apple|banana|orange|grapes|mango)\b)(?:[^,]*?\([^)]*\))?[^,]*?,\s*[^,]*?\1\b/gi, '$1 (portion)')
    // Fix "and" followed immediately by the same word
    .replace(/\band\s+(\w+)(?:\s+\w+)*\s+\1\b/gi, 'and $1');
  
  // Apply the main deduplication algorithm
  normalizedText = removeDuplicateFoodItems(normalizedText);
  
  // Clean up empty constructs and normalize spacing
  normalizedText = normalizedText
    // Remove empty items created by our replacements
    .replace(/,\s*,/g, ',')
    .replace(/\(\s*\)/g, '')
    .replace(/\s*,\s*$/g, '')
    .replace(/^\s*,\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    // Fix commas and spaces
    .replace(/,(?!\s)/g, ', ')
    .replace(/\s+,/g, ',')
    // Fix double "with" issues
    .replace(/\swith\s+with\s/g, ' with ')
    .trim();
  
  // Apply additional formatting cleanup
  normalizedText = cleanupDuplicationFormatting(normalizedText);
  
  // Reattach the health benefit
  if (healthBenefit) {
    normalizedText = `${normalizedText} ${healthBenefit}`;
  }
  
  return normalizedText;
}
