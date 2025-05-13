import { ReactNode } from 'react';
import { 
  processDashPatterns,
  processMeasurements,
  processLocalNames 
} from './helpers/textProcessing';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';

// Enhanced helper function to deduplicate repeated food and portion terms
const deduplicateRepeatedTerms = (text: string): string => {
  try {
    // First, normalize the text to make pattern matching more consistent
    let dedupedText = text.replace(/\s+/g, ' ').trim();
    
    // Pre-process specific foods with their portions that commonly get duplicated
    // Match food items with their portions and keep only the first occurrence
    const specificFoodPatterns = [
      // Specific fruits and nuts with portions
      /(with\s+Chickoo\s+\(\d+\s*nos\))/gi,
      /(with\s+cashews\s+\(\d+\s*handful\))/gi,
      /(with\s+peanuts\s+\(\d+\s*handful\))/gi,
      /(with\s+almonds\s+\(\d+\s*nos\))/gi,
      /(with\s+walnuts\s+\(\d+\s*nos\))/gi,
      /(with\s+chia\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(and\s+chia\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(with\s+flax\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(with\s+sunflower\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(with\s+pumpkin\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(with\s+sesame\s+seeds\s+\(\d+\s*tsp\))/gi,
      /(with\s+Dandelion\s+Greens\s+\([^)]+\))/gi,
      /(with\s+a\s+side\s+of\s+sprouts\s+\([^)]+\))/gi,
      // Add more patterns for fruits, vegetables, and other common items
      /(with\s+[A-Z][a-z]+\s+\([^)]+\))/gi,
      /(and\s+[A-Z][a-z]+\s+\([^)]+\))/gi,
    ];
    
    // Process each specific food pattern
    for (const pattern of specificFoodPatterns) {
      const matches = dedupedText.match(pattern);
      if (matches && matches.length > 1) {
        // Keep only the first occurrence
        dedupedText = dedupedText.replace(new RegExp(`(${matches[0]})(.*)\\1`, 'gi'), '$1$2');
      }
    }
    
    // Second pass: Remove any duplicated phrases with portion information using more generic patterns
    const genericPatterns = [
      // Common patterns that get repeated
      // Portions with measurements
      /(\(\d+\s*katori\))/g,
      /(\(\d+\s*rotis?\))/g,
      /(\(\d+\s*chamach\))/g,
      /(\(\d+\s*cup\))/g,
      /(\(\d+\/\d+\s*cup\))/g,
      /(\(\d+\s*handful\))/g,
      /(\(\d+\s*nos\))/g,
      /(\(\d+\s*tsp\))/g,
      /(\(\d+\s*tbsp\))/g,
      /(\(\d+\s*pancakes?\))/g,
      /(\(\d+\s*glass\))/g,
      /(\(\d+\s*idlis?\))/g,
      /(\(\d+\s*dosas?\))/g,
      /(\(\d+\s*slice\))/g,
      /(\(\d+\s*pieces?\))/g,
      /(\(\d+\s*ande\))/g,
      /(\(\d+\s*egg whites?\))/g,
      /(\(\d+\s*whole wheat wrap\))/g,
      /(\(\d+\s*dhokla\))/g,
      /(\(\d+\s*cheela\))/g,
      /(\(\d+\s*uttapam\))/g,
      /(\(\d+\s*paratha\))/g,
      /(\(smaller portion\))/g,
      /(\(\d+\s*small katori\))/g,
      
      // Ingredients with portions
      /(with\s+[a-zA-Z]+\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+[a-zA-Z]+\s+\(seasonal\))/g,
      /(with\s+[a-zA-Z\s]+\s+\([^)]+portion\))/g,
      
      // Seeds and nuts with portions
      /(with\s+[a-zA-Z]+\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(and\s+[a-zA-Z]+\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g,
      
      // Special fruits and specific food items
      /(with\s+a\s+small\s+bowl\s+of\s+[A-Za-z]+)/g,
      /(with\s+[A-Z][a-z]+\s+\([^)]+\))/g,
    ];
    
    // Process each generic pattern
    for (const pattern of genericPatterns) {
      // Find all matches of the current pattern
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
    
    // Third pass: More aggressive pattern matching for specific repeating structures
    
    // 1. Handle "with X (1 Y), with X (1 Y)" patterns - like "with Chickoo (1 nos), with Chickoo (1 nos)"
    dedupedText = dedupedText.replace(/with\s+([A-Za-z]+)\s+\(([^)]+)\)([^,]*),\s*with\s+\1\s+\(\2\)/gi, 
      'with $1 ($2)$3');
    
    // 2. Handle "and X (1 Y), and X (1 Y)" patterns - like "and chia seeds (1 tsp), and chia seeds (1 tsp)"
    dedupedText = dedupedText.replace(/and\s+([A-Za-z\s]+)\s+\(([^)]+)\)([^,]*),\s*and\s+\1\s+\(\2\)/gi, 
      'and $1 ($2)$3');
    
    // 3. Handle repeating food items with different conjunction words (with/and)
    dedupedText = dedupedText.replace(/with\s+([A-Za-z\s]+)\s+\(([^)]+)\)([^,]*),\s*and\s+\1\s+\(\2\)/gi, 
      'with $1 ($2)$3');
    dedupedText = dedupedText.replace(/and\s+([A-Za-z\s]+)\s+\(([^)]+)\)([^,]*),\s*with\s+\1\s+\(\2\)/gi, 
      'and $1 ($2)$3');
    
    // More aggressive approach - any duplicated food with portion regardless of connector
    dedupedText = dedupedText.replace(/((?:with|and)\s+[A-Za-z\s]+\s+\([^)]+\)[^,]*),\s*(?:with|and)\s+([A-Za-z\s]+)\s+\([^)]+\)/gi, 
      function(match, g1, g2) {
        // If g2 is already in g1 (case-insensitive), remove the second occurrence
        if (g1.toLowerCase().includes(g2.toLowerCase())) {
          return g1;
        }
        return match; // Keep if not a duplicate
      });
    
    // 4. Handle duplicate items with different portions - keep only the first one
    const foodItemsRegex = /\b(Chickoo|cashews|chia seeds|flax seeds|almonds|walnuts|sprouts|yogurt|curd|dahi)\b/gi;
    const foodItems = [...new Set([...dedupedText.matchAll(foodItemsRegex)].map(m => m[0].toLowerCase()))];
    
    // Clean up formatting issues:
    // Fix consecutive commas
    dedupedText = dedupedText.replace(/,\s*,/g, ',');
    // Remove trailing commas followed by "and" or "with"
    dedupedText = dedupedText.replace(/,\s+(and|with)/g, ' $1');
    // Fix any double "and" that might have been created
    dedupedText = dedupedText.replace(/\s+and\s+and\s+/g, ' and ');
    // Fix repeated "with" instances
    dedupedText = dedupedText.replace(/with\s+with/g, 'with');
    // Fix multiple spaces
    dedupedText = dedupedText.replace(/\s+/g, ' ');
    
    return dedupedText;
  } catch (error) {
    console.error("Error deduplicating text:", error);
    return text; // Return original text if error
  }
};

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
