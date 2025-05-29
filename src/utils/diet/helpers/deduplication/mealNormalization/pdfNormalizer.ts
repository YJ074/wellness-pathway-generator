
import { cleanupDuplicationFormatting } from '../formatting';
import { removeDuplicateFoodItems } from './duplicateRemover';

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
  
  // Fix the "T katori" formatting issue early in the process
  normalizedText = normalizedText
    .replace(/\bT katori\b/gi, '1 katori')
    .replace(/\bT\s+katori\b/gi, '1 katori')
    // Also fix other potential single-character corruptions of numbers
    .replace(/\b[A-Z]\s+katori\b/gi, (match) => {
      // If it's a single letter followed by katori, replace with "1 katori"
      return '1 katori';
    })
    // Fix similar issues with other measurements
    .replace(/\bT glass\b/gi, '1 glass')
    .replace(/\bT bowl\b/gi, '1 bowl')
    .replace(/\bT roti\b/gi, '1 roti')
    .replace(/\bT rotis\b/gi, '1 rotis')
    .replace(/\bT chamach\b/gi, '1 chamach')
    .replace(/\bT mutthi\b/gi, '1 mutthi');
  
  // Add missing portions for common food items to make descriptions clearer
  normalizedText = normalizedText
    // Add portions to roti/chapati when missing
    .replace(/\bChanna Flour Roti\b(?!\s*\()/gi, 'Channa Flour Roti (2 pieces)')
    .replace(/\bBesan Roti\b(?!\s*\()/gi, 'Besan Roti (2 pieces)')
    .replace(/\bChickpea Flour Roti\b(?!\s*\()/gi, 'Chickpea Flour Roti (2 pieces)')
    .replace(/\bWhole Wheat Roti\b(?!\s*\()/gi, 'Whole Wheat Roti (2 pieces)')
    .replace(/\bMultigrain Roti\b(?!\s*\()/gi, 'Multigrain Roti (2 pieces)')
    // Add portions to dal when missing
    .replace(/\bUrad Dal\b(?!\s*\()/gi, 'Urad Dal (1 katori)')
    .replace(/\bMoong Dal\b(?!\s*\()/gi, 'Moong Dal (1 katori)')
    .replace(/\bToor Dal\b(?!\s*\()/gi, 'Toor Dal (1 katori)')
    .replace(/\bMasoor Dal\b(?!\s*\()/gi, 'Masoor Dal (1 katori)')
    // Only add portions to standalone curry or sabzi words, not when part of a description
    .replace(/\b(?<![\w\s]and\s)curry\b(?!\s*\()/gi, 'mixed curry (1 katori)')
    .replace(/\b(?<![\w\s]and\s)sabzi\b(?!\s*\()/gi, 'mixed sabzi (1 katori)')
    // Fix rice portions
    .replace(/\bBrown Rice\b(?!\s*\()/gi, 'Brown Rice (1 katori)')
    .replace(/\bWhite Rice\b(?!\s*\()/gi, 'White Rice (1 katori)')
    .replace(/\bBasmati Rice\b(?!\s*\()/gi, 'Basmati Rice (1 katori)');
  
  // Extract the health benefit if present, to process separately
  const benefitMatch = normalizedText.match(/ - \(([^)]+)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  if (healthBenefit) {
    normalizedText = normalizedText.replace(healthBenefit, '');
  }
  
  // First, handle options like "X or Y" to ensure they appear only once
  normalizedText = normalizedText.replace(/(\d+\s+roti\s+OR\s+[^,]+)(?:.*?)(\1)/gi, '$1');
  normalizedText = normalizedText.replace(/(\d+\s+rotis\s+OR\s+[^,]+)(?:.*?)(\1)/gi, '$1');
  
  // Handle common patterns like "X and Y curry" where X and Y are both curries
  normalizedText = normalizedText.replace(/(\w+)\s+curry(?:.*?)and\s+(\w+)\s+curry/gi, '$1 and $2 curry');
  
  // First pass: collect all food items with their portions
  const foodItems = new Map<string, string>();
  const foodPortionRegex = /(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s*\(([^)]+)\)/g;
  let match;
  
  while ((match = foodPortionRegex.exec(normalizedText)) !== null) {
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
  
  // Handle specific repetition patterns that frequently occur
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
    // Fix repeated sprouts
    .replace(/(\b(?:sprouts|moong|mung|matki)\b)(?:[^,]*?\([^)]*\))?[^,]*?,\s*[^,]*?\1\b/gi, '$1 (portion)')
    // Fix repeated sabzi references
    .replace(/(\w+)\s+sabzi(?:.*?)(?:,|\s+and|\s+with)\s+\1\s+sabzi/gi, '$1 sabzi')
    // Fix "and" followed immediately by the same word
    .replace(/\band\s+(\w+)(?:\s+\w+)*\s+\1\b/gi, 'and $1')
    // Fix "OR" issues where the same option is repeated
    .replace(/\b([^\s,]+(?:\s+[^\s,]+)*)\s+OR\s+[^,]*?\1\b/gi, '$1 OR alternative')
    // Fix "dahi/curd/yogurt" appearing multiple times - any dairy repetition
    .replace(/dahi\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:curd|yogurt|dahi)\s*\([^)]*\)/gi, 'dahi (1 katori)')
    .replace(/curd\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:dahi|yogurt|curd)\s*\([^)]*\)/gi, 'curd (1 katori)')
    .replace(/yogurt\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:dahi|curd|yogurt)\s*\([^)]*\)/gi, 'yogurt (1 katori)')
    // Fix chaas and buttermilk duplication
    .replace(/chaas\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:buttermilk|chaas)\s*\([^)]*\)/gi, 'chaas (1 glass)')
    .replace(/buttermilk\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:chaas|buttermilk)\s*\([^)]*\)/gi, 'buttermilk (1 glass)')
    // Fix rajma and kidney beans duplication
    .replace(/rajma\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:kidney beans|rajma)\s*\([^)]*\)/gi, 'rajma (portion)')
    .replace(/kidney beans\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:rajma|kidney beans)\s*\([^)]*\)/gi, 'kidney beans (portion)')
    // Fix dal repetition (different types of dal in one meal)
    .replace(/moong dal\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:toor|masoor|urad)\s+dal\s*\([^)]*\)/gi, 'mixed dal (portion)')
    .replace(/toor dal\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:moong|masoor|urad)\s+dal\s*\([^)]*\)/gi, 'mixed dal (portion)')
    .replace(/masoor dal\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:toor|moong|urad)\s+dal\s*\([^)]*\)/gi, 'mixed dal (portion)')
    .replace(/urad dal\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:toor|masoor|moong)\s+dal\s*\([^)]*\)/gi, 'mixed dal (portion)')
    // Remove redundant legume mentions
    .replace(/(?:toor|masoor|moong|urad) dal and (?:toor|masoor|moong|urad) dal/gi, 'mixed dal')
    // Simplify references to black-eyed peas and similar legumes
    .replace(/black-eyed peas\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:cowpeas|lobia)\s*\([^)]*\)/gi, 'black-eyed peas (portion)')
    .replace(/cowpeas\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:black-eyed peas|lobia)\s*\([^)]*\)/gi, 'cowpeas (portion)')
    .replace(/lobia\s*\([^)]*\)(?:.*?)(?:,|\s+and|\s+with)\s+(?:black-eyed peas|cowpeas)\s*\([^)]*\)/gi, 'lobia (portion)');
  
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
