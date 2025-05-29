
import { ReactNode } from 'react';
import { 
  processDashPatterns,
  processMeasurements,
  processLocalNames 
} from './helpers/textProcessing';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';
// Use the enhanced triple-pass deduplication
import { applyTriplePassDeduplication } from '@/utils/diet/helpers/deduplication';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Fixed to prevent word repetition and overlapping highlights
export const formatMealDescription = (text: string): ReactNode[] => {
  try {
    // First, ensure the text has been thoroughly deduplicated using our enhanced approach
    let deduplicatedText = applyTriplePassDeduplication(text);
    
    // Fix the "T katori" formatting issue - this appears to be a corruption of "1 katori"
    deduplicatedText = deduplicatedText
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
