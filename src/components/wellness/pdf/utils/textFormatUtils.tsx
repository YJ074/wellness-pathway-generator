
import { ReactNode } from 'react';
import { processDashPatterns } from './helpers/textProcessingHelpers';
import { processMeasurements } from './helpers/textProcessingHelpers';
import { processLocalNames } from './helpers/textProcessingHelpers';
import { processProbioticFoods, processPrebioticFoods } from './helpers/probioticPrebioticProcessor';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Fixed to prevent word repetition and overlapping
export const formatMealDescription = (text: string): ReactNode[] => {
  // Process the text in sequence to avoid overlapping highlights
  
  // Step 1: Process dash patterns (like "Rice Flakes - Poha")
  const dashProcessedText = processDashPatterns(text);
  
  // Step 2: Process measurement patterns
  const measurementsProcessed = processMeasurements(dashProcessedText);
  
  // Step 3: Process parenthetical expressions (local names)
  const localNamesProcessed = processLocalNames(measurementsProcessed);
  
  // Step 4: Process probiotic foods
  const probioticsProcessed = processProbioticFoods(localNamesProcessed);
  
  // Step 5: Process prebiotic foods
  const prebioticsProcessed = processPrebioticFoods(probioticsProcessed);
  
  return prebioticsProcessed;
};
