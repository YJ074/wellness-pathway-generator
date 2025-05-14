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
  
  // Enhanced duplicate detection - specifically catch repeated food items with portions
  const foodItemRegex = /(\w+(?:\s+\w+)*)\s*\((\d+(?:\s+\w+)*)\)/g;
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
    .trim();
  
  // Apply additional formatting cleanup
  normalizedText = cleanupDuplicationFormatting(normalizedText);
  
  // Reattach the health benefit
  if (healthBenefit) {
    normalizedText = `${normalizedText} ${healthBenefit}`;
  }
  
  return normalizedText;
}
