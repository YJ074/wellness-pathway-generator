
/**
 * Text formatting utilities for meal descriptions
 * Provides functions to clean and standardize text formatting
 */

/**
 * Normalizes text whitespace and punctuation
 * @param text Text to normalize
 * @returns Normalized text with consistent spacing and punctuation
 */
export const normalizeWhitespaceAndPunctuation = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')            // Replace multiple spaces with a single space
    .replace(/\s+,/g, ',')           // Remove spaces before commas
    .replace(/,\s+/g, ', ')          // Ensure a single space after commas
    .replace(/\s+\(/g, ' (')         // Remove extra spaces before parentheses
    .replace(/\)\s+/g, ') ')         // Ensure a single space after parentheses
    .trim();
};

/**
 * Formats text for PDF rendering with precise spacing and punctuation
 * @param text Text to format for PDF
 * @returns Text formatted for PDF display
 */
export const formatForPDF = (text: string): string => {
  return text
    .replace(/\(\s+/g, '(')          // Remove space after opening parenthesis
    .replace(/\s+\)/g, ')')          // Remove space before closing parenthesis
    .replace(/\s+,/g, ',')           // Remove space before comma
    .replace(/,(?!\s)/g, ', ')       // Ensure space after comma
    .replace(/\s+\./g, '.')          // Remove space before period
    .replace(/\.\s+\(/g, ' (')       // Fix spacing between period and parenthesis
    .replace(/\s{2,}/g, ' ')         // Remove extra spaces
    .replace(/,\s*,/g, ',')          // Fix double commas
    .replace(/,,+/g, ',')            // Fix multiple commas
    .replace(/\(\s*\)/g, '')         // Remove empty parentheses
    .trim();
};

/**
 * Adds an item to a meal description with proper formatting
 * @param mealDescription Original meal description
 * @param addition Item to add
 * @returns Formatted meal description with the addition
 */
export const formatAddition = (mealDescription: string, addition: string): string => {
  if (!mealDescription || mealDescription.trim() === '') {
    return addition;
  }
  
  if (mealDescription.endsWith(',')) {
    return `${mealDescription} ${addition}`;
  } else if (mealDescription.endsWith('.') || mealDescription.endsWith('!')) {
    return `${mealDescription} ${addition}`;
  } else {
    return `${mealDescription}, ${addition}`;
  }
};

/**
 * Formats a meal description to remove detected duplications
 * @param mealDescription The original meal description
 * @param duplications Array of detected duplications to handle
 * @returns A formatted meal description with duplications addressed
 */
export const formatMealWithDeduplication = (mealDescription: string, duplications: string[]): string => {
  let result = mealDescription;
  
  // Process each detected duplication
  duplications.forEach(dup => {
    // Create a regex that looks for repeated instances with word boundaries
    const dupRegex = new RegExp(`\\b${dup}\\b.*\\b${dup}\\b`, 'gi');
    
    // Replace with a single instance
    result = result.replace(dupRegex, (match) => {
      // Keep only the first instance plus whatever follows after the second
      const parts = match.split(new RegExp(`\\b${dup}\\b`, 'i'));
      if (parts.length >= 3) {
        return `${parts[0]}${dup}${parts[parts.length-1]}`;
      }
      return match;
    });
  });
  
  return cleanupDuplicationFormatting(result);
};

/**
 * Cleans up formatting issues that can occur after deduplication
 * @param text Text to clean up
 * @returns Text with fixed connector formatting
 */
export const cleanupDuplicationFormatting = (text: string): string => {
  // First pass - clean up basic formatting issues
  let cleaned = text
    .replace(/,\s*,/g, ',')            // Fix double commas
    .replace(/,\s+(and|with)/g, ' $1') // Fix comma followed by connector
    .replace(/\s+(and|with)\s+\1\s+/g, ' $1 ') // Fix double connectors
    .replace(/with\s+with/g, 'with')   // Fix repeated "with"
    .replace(/and\s+and/g, 'and')      // Fix repeated "and"
    .replace(/\s+/g, ' ')              // Normalize spaces
    .replace(/, *$/g, '')              // Remove trailing commas
    .replace(/\s*,\s*and\s*,\s*/g, ' and ') // Fix ", and ,"
    .replace(/\(\s*\)/g, '')           // Remove empty parentheses
    .replace(/, +\)/g, ')')            // Fix comma before closing parenthesis
    .trim();
  
  // Second pass - handle more complex patterns
  cleaned = cleaned
    // Fix sandwich pattern duplications like "A, B, C, and A"
    .replace(/(\w+(?:\s+\w+)*),(?:[^,]+,)*\s*(?:and|with)\s+\1/gi, '$1')
    // Fix repeated fruits with portions
    .replace(/(\b(?:fruit|apple|banana|orange|grapes|mango|chickoo)\b)(?:[^,]*?\([^)]*\))?[^,]*?,\s*[^,]*?\1\b/gi, '$1 (portion)')
    // Fix repeated vegetables with portions
    .replace(/(\b(?:vegetable|carrot|spinach|tomato|cucumber|onion|garlic)\b)(?:[^,]*?\([^)]*\))?[^,]*?,\s*[^,]*?\1\b/gi, '$1 (portion)')
    // Fix common additions that get duplicated
    .replace(/with\s+(?:\w+\s+)?seeds(?:,|\s+and|\s+with)\s+with\s+(?:\w+\s+)?seeds/gi, 'with mixed seeds')
    .replace(/with\s+(?:\w+\s+)?nuts(?:,|\s+and|\s+with)\s+with\s+(?:\w+\s+)?nuts/gi, 'with mixed nuts')
    // Fix sabzi duplications
    .replace(/(\w+)\s+sabzi(?:[^,]*?)\s+\1\s+sabzi/gi, '$1 sabzi')
    // Fix dal/lentil duplications
    .replace(/(\w+)\s+dal(?:[^,]*?)\s+\1\s+dal/gi, '$1 dal')
    .replace(/(\w+)\s+lentil(?:[^,]*?)\s+\1\s+lentil/gi, '$1 lentil')
    // Remove any empty sections that may result from our cleaning
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/\s*,\s*\)/g, ')')
    .replace(/\(\s*,\s*/g, '(')
    .trim();
  
  return cleaned;
};
