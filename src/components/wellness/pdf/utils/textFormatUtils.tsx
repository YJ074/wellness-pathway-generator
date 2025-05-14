
import { ReactNode } from 'react';
import { 
  processDashPatterns,
  processMeasurements,
  processLocalNames 
} from './helpers/textProcessing';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';
// Update this import to use the new modular deduplication system
import { normalizeMealForPDF } from '../../../../utils/diet/helpers/deduplication';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Fixed to prevent word repetition and overlapping highlights
export const formatMealDescription = (text: string): ReactNode[] => {
  try {
    // First, deduplicate the text using our enhanced normalizeMealForPDF function
    // This aggressive deduplication is crucial for PDF rendering
    const deduplicatedText = normalizeMealForPDF(text);
    
    // Additional quick deduplication pass for cases that may have been missed
    // Especially for breakfast items which tend to have more duplication
    let finalText = deduplicatedText
      // Handle any remaining duplicates with portions
      .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi, '$1 (portion)')
      // Handle any duplicate seeds (very common issue)
      .replace(/(\b[A-Za-z]+\s+seeds)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi, '$1 (portion)')
      // Fix connector duplication
      .replace(/(with|and)\s+\1/gi, '$1')
      // Fix health benefits showing twice
      .replace(/\s*-\s*\([^)]+\)\s*-\s*\([^)]+\)/g, ' - ($1)')
      // Ensure consistent spacing around health benefits
      .replace(/\s*-\s*\(/g, ' - (');
    
    // Process the text in sequence to avoid overlapping highlights
    // Each step takes the output of the previous step
    
    // Step 1: Process dash patterns (like "Rice Flakes - Poha")
    const dashProcessedText = processDashPatterns(finalText);
    
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
