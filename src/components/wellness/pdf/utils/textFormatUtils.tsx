import { ReactNode } from 'react';
import { processDashPatterns } from './helpers/textProcessingHelpers';
import { processMeasurements } from './helpers/textProcessingHelpers';
import { processLocalNames } from './helpers/textProcessingHelpers';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Fixed to prevent word repetition and overlapping highlights
export const formatMealDescription = (text: string): ReactNode[] => {
  try {
    // First, deduplicate repeated food items in the same description
    // For example: "with peanuts (1 handful), with peanuts (1 handful)" -> "with peanuts (1 handful)"
    const dedupedText = deduplicateRepeatedTerms(text);
    
    // Process the text in sequence to avoid overlapping highlights
    // Each step takes the output of the previous step
    
    // Step 1: Process dash patterns (like "Rice Flakes - Poha")
    const dashProcessedText = processDashPatterns(dedupedText);
    
    // Step 2: Process measurement patterns (like "2 katori", "1 bowl", etc)
    const measurementsProcessed = processMeasurements(dashProcessedText);
    
    // Step 3: Process parenthetical expressions (local names)
    const localNamesProcessed = processLocalNames(measurementsProcessed);
    
    // Step 4: Process probiotic foods (like "Yogurt", "Curd", etc)
    const probioticsProcessed = processProbioticFoods(localNamesProcessed);
    
    // Step 5: Process prebiotic foods (like "Garlic", "Onions", etc)
    const prebioticsProcessed = processPrebioticFoods(probioticsProcessed);
    
    return prebioticsProcessed;
  } catch (error) {
    // If any error occurs during processing, return the original text as a fallback
    console.error("Error formatting meal description:", error);
    return [text];
  }
};

// Helper function to deduplicate repeated food and portion terms
const deduplicateRepeatedTerms = (text: string): string => {
  try {
    // Common patterns that get repeated
    const patterns = [
      // Portions with measurements
      /(\(\d+\s*katori\))/g,
      /(\(\d+\s*rotis?\))/g,
      /(\(\d+\s*chamach\))/g,
      /(\(\d+\s*cup\))/g,
      /(\(\d+\/\d+\s*cup\))/g,
      
      // Ingredients with portions
      /(with\s+[a-zA-Z]+\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+[a-zA-Z]+\s+\(seasonal\)\(\d+\s*[a-zA-Z]+\))/g,
      
      // Seeds and nuts with portions
      /(with\s+[a-zA-Z]+\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+cashews\s+\(\d+\s*handful\))/g,
      /(with\s+peanuts\s+\(\d+\s*handful\))/g,
      
      // Chia seeds pattern
      /(and\s+chia\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g
    ];
    
    let dedupedText = text;
    
    // Process each pattern to find duplicates
    for (const pattern of patterns) {
      const matches = [...dedupedText.matchAll(pattern)];
      
      // Skip if no duplicates found
      if (matches.length <= 1) continue;
      
      // Create a map to track unique matches and their first occurrence
      const uniqueMatches = new Map();
      
      matches.forEach(match => {
        const matchText = match[0];
        if (!uniqueMatches.has(matchText)) {
          uniqueMatches.set(matchText, match.index);
        }
      });
      
      // If we found duplicates, rebuild the text without them
      if (uniqueMatches.size < matches.length) {
        let newText = '';
        let lastIndex = 0;
        let skipRanges = [];
        
        // Sort matches by index
        matches.sort((a, b) => a.index - b.index);
        
        // Keep track of which matches to keep (first occurrence) and which to skip
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const matchText = match[0];
          
          // If it's the first occurrence of this match, keep it
          if (uniqueMatches.get(matchText) === match.index) {
            continue;
          }
          
          // Otherwise, mark this range to skip
          skipRanges.push({
            start: match.index,
            end: match.index + matchText.length
          });
        }
        
        // Rebuild text, skipping duplicate ranges
        for (let i = 0; i < dedupedText.length; i++) {
          const shouldSkip = skipRanges.some(range => i >= range.start && i < range.end);
          
          if (!shouldSkip) {
            newText += dedupedText[i];
          }
        }
        
        dedupedText = newText;
      }
    }
    
    // Special case for repeated commas after removing terms
    dedupedText = dedupedText.replace(/,\s*,/g, ',');
    
    return dedupedText;
  } catch (error) {
    console.error("Error deduplicating text:", error);
    return text; // Return original text if error
  }
};
