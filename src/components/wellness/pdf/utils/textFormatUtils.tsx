
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

// Enhanced helper function to deduplicate repeated food and portion terms
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
      /(\(\d+\s*handful\))/g, // Added for handful portions
      /(\(\d+\s*nos\))/g, // Added for 'nos' portions
      /(\(\d+\s*tsp\))/g, // Added for 'tsp' portions
      /(\(\d+\s*pancakes?\))/g, // Added for pancake portions
      /(\(\d+\s*glass\))/g, // Added for glass portions
      /(\(\d+\s*idlis?\))/g, // Added for idli portions
      /(\(\d+\s*dosas?\))/g, // Added for dosa portions
      /(\(\d+\s*slice\))/g, // Added for slice portions
      /(\(\d+\s*pieces?\))/g, // Added for pieces portions
      /(\(\d+\s*ande\))/g, // Added for egg portions
      /(\(\d+\s*egg whites?\))/g, // Added for egg white portions
      /(\(\d+\s*whole wheat wrap\))/g, // Added for wrap portions
      /(\(\d+\s*dhokla\))/g, // Added for dhokla portions
      /(\(\d+\s*cheela\))/g, // Added for cheela portions
      /(\(\d+\s*uttapam\))/g, // Added for uttapam portions
      /(\(\d+\s*paratha\))/g, // Added for paratha portions
      /(\(smaller portion\))/g, // Added for smaller portion notation
      /(\(\d+\s*small katori\))/g, // Added for small katori portions
      
      // Ingredients with portions
      /(with\s+[a-zA-Z]+\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+[a-zA-Z]+\s+\(seasonal\))/g,
      
      // Specific ingredients that get repeated
      /(with\s+walnuts\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+almonds\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+Sitaphal\s+\([^)]*\))/g, // For "with Sitaphal (Sugar-apple)"
      /(with\s+cashews\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+Lychee\s+\([^)]*\))/g, // For "with Lychee (seasonal)"
      /(with\s+mixed\s+fruits)/g, // For "with mixed fruits"
      /(with\s+seasonal\s+fruits)/g, // For "with seasonal fruits"
      /(with\s+seasonal\s+sabzi)/g, // For "with seasonal sabzi"
      /(with\s+sabzi(\s+\(\d+\s*katori\))?)/g, // For "with sabzi" with optional portion
      /(with\s+a\s+side\s+of\s+sprouts\s+\(\d+\s*[a-zA-Z\s]+\))/g, // For "with a side of sprouts"
      /(with\s+badam\s+milk\s+\(\d+\s*glass\))/g, // For "with badam milk"
      /(with\s+chaas\s+\(\d+\s*glass\))/g, // For "with chaas"
      
      // Seeds and nuts with portions
      /(with\s+[a-zA-Z]+\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+cashews\s+\(\d+\s*handful\))/g,
      /(with\s+peanuts\s+\(\d+\s*handful\))/g,
      /(and\s+chia\s+seeds\s+\(\d+\s*tsp\))/g, // For "and chia seeds (1 tsp)"
      /(with\s+flax\s+seeds\s+\(\d+\s*tsp\))/g, // For "with flax seeds (1 tsp)"
      
      // Special fruits and specific food items
      /(with\s+a\s+small\s+bowl\s+of\s+Handvo)/g,
      /(with\s+a\s+small\s+bowl\s+of\s+Kombucha)/g, // For "with a small bowl of Kombucha"
      /(with\s+[A-Z][a-z]+\s+\([^)]+\))/g, // For fruits like "with Apple (1 medium)"
      
      // Special patterns for repeated phrases
      /(and\s+chia\s+seeds\s+\(\d+\s*[a-zA-Z]+\))/g,
      /(with\s+dahi\s+\(\d+\s*[a-zA-Z\s]+\))/g, // For "with dahi (1 small katori)"
      /(with\s+sambhar\s+\(\d+\s*katori\))/g, // For "with sambhar (1 katori)"
      /(with\s+sambar\s+\(\d+\s*katori\))/g, // For "with sambar (1 katori)" (alternative spelling)
      /(with\s+tamatar\s+chutney\s+\(\d+\s*chamach\))/g, // For "with tamatar chutney (2 chamach)"
      /(with\s+pudina\s+chutney\s+\(\d+\s*chamach\))/g, // For "with pudina chutney (2 chamach)"
      /(with\s+nariyal\s+chutney\s+\(\d+\s*chamach\))/g // For "with nariyal chutney (2 chamach)"
    ];
    
    let dedupedText = text;
    
    // First handle kombucha with fractions specifically as they often cause issues
    dedupedText = dedupedText.replace(/Kombucha\s*\(\d+\/\d+\s*cup[^)]*\)[^,]*,\s*with a small bowl of Kombucha\s*\(\d+\/\d+\s*cup[^)]*\)/g, 
      match => match.split(',')[0]);
    
    // Handle repeated "and chia seeds" pattern
    dedupedText = dedupedText.replace(/(and\s+chia\s+seeds\s+\(\d+\s*tsp\))[^,]*,\s*(and\s+chia\s+seeds\s+\(\d+\s*tsp\))/g, 
      (_, first) => first);
    
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
    
    // Special case fixes for common patterns:
    
    // 1. Remove duplicated Kombucha phrases that may slip through
    dedupedText = dedupedText.replace(/with a small bowl of Kombucha\s*\([^)]*\)[^,]*,\s*with a small bowl of Kombucha\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
    
    // 2. Fix cases where chia seeds appear twice
    dedupedText = dedupedText.replace(/chia seeds\s*\([^)]*\)[^,]*,\s*(?:and|with)\s+chia seeds\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
    
    // 3. Fix cashews appearing twice
    dedupedText = dedupedText.replace(/with cashews\s*\([^)]*\)[^,]*,\s*with cashews\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
      
    // 4. Fix generic fruits appearing twice
    dedupedText = dedupedText.replace(/with\s+([A-Z][a-z]+)\s+\([^)]+\)[^,]*,\s*with\s+\1\s+\([^)]+\)/g, 
      match => match.split(',')[0]);
      
    // 5. Fix repeated sabzi mentions
    dedupedText = dedupedText.replace(/with sabzi\s*\([^)]*\)[^,]*,\s*with sabzi\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
      
    // 6. Fix repeated dahi mentions
    dedupedText = dedupedText.replace(/with dahi\s*\([^)]*\)[^,]*,\s*with dahi\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
      
    // 7. Fix repeated chutney mentions
    dedupedText = dedupedText.replace(/with\s+(pudina|tamatar|nariyal)\s+chutney\s*\([^)]*\)[^,]*,\s*with\s+\1\s+chutney\s*\([^)]*\)/g, 
      match => match.split(',')[0]);
      
    // 8. Fix seasonal fruits appearing twice
    dedupedText = dedupedText.replace(/with seasonal fruits[^,]*,\s*with seasonal fruits/g, 
      match => match.split(',')[0]);
      
    // 9. Fix mixed fruits appearing twice
    dedupedText = dedupedText.replace(/with mixed fruits[^,]*,\s*with mixed fruits/g, 
      match => match.split(',')[0]);
    
    // Clean up formatting issues:
    // Special case for repeated commas after removing terms
    dedupedText = dedupedText.replace(/,\s*,/g, ',');
    // Remove trailing commas followed by "and"
    dedupedText = dedupedText.replace(/,\s+and/g, ' and');
    // Fix any double "and" that might have been created
    dedupedText = dedupedText.replace(/\s+and\s+and\s+/g, ' and ');
    // Fix repeated "with" instances
    dedupedText = dedupedText.replace(/with\s+with/g, 'with');
    
    return dedupedText;
  } catch (error) {
    console.error("Error deduplicating text:", error);
    return text; // Return original text if error
  }
};
