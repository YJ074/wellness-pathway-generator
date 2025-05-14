
import { ReactNode } from 'react';
import { 
  processDashPatterns,
  processMeasurements,
  processLocalNames 
} from './helpers/textProcessing';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';
// Use the direct import from the consolidated deduplication module
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Fixed to prevent word repetition and overlapping highlights
export const formatMealDescription = (text: string): ReactNode[] => {
  try {
    // First, ensure the text has been thoroughly deduplicated
    // Apply double-pass deduplication for maximum effectiveness
    const deduplicatedText = normalizeMealForPDF(normalizeMealForPDF(text));
    
    // Process the text in sequence to avoid overlapping highlights
    // Each step takes the output of the previous step
    
    // Step 1: Process dash patterns (like "Rice Flakes - Poha")
    const dashProcessedText = processDashPatterns(deduplicatedText);
    
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
