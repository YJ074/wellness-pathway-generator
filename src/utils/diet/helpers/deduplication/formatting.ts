
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
    .trim();
};

/**
 * Adds an item to a meal description with proper formatting
 * @param mealDescription Original meal description
 * @param addition Item to add
 * @returns Formatted meal description with the addition
 */
export const formatAddition = (mealDescription: string, addition: string): string => {
  if (mealDescription.endsWith(',')) {
    return `${mealDescription} ${addition}`;
  } else if (mealDescription.endsWith('.') || mealDescription.endsWith('!')) {
    return `${mealDescription} ${addition}`;
  } else {
    return `${mealDescription}, ${addition}`;
  }
};

/**
 * Cleans up formatting issues that can occur after deduplication
 * @param text Text to clean up
 * @returns Text with fixed connector formatting
 */
export const cleanupDuplicationFormatting = (text: string): string => {
  return text
    .replace(/,\s*,/g, ',')            // Fix double commas
    .replace(/,\s+(and|with)/g, ' $1') // Fix comma followed by connector
    .replace(/\s+(and|with)\s+\1\s+/g, ' $1 ') // Fix double connectors
    .replace(/with\s+with/g, 'with')   // Fix repeated "with"
    .replace(/and\s+and/g, 'and')      // Fix repeated "and"
    .replace(/\s+/g, ' ')              // Normalize spaces
    .trim();
};
