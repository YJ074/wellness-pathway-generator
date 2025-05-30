
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
    
    // Fix the "T katori" and "S katori" formatting issues - these appear to be corruptions of "1 katori"
    deduplicatedText = deduplicatedText
      .replace(/\bT katori\b/gi, '1 katori')
      .replace(/\bT\s+katori\b/gi, '1 katori')
      .replace(/\bS katori\b/gi, '1 katori')
      .replace(/\bS\s+katori\b/gi, '1 katori')
      // Also fix other potential single-character corruptions of numbers
      .replace(/\b[A-Z]\s+katori\b/gi, (match) => {
        // If it's a single letter followed by katori, replace with "1 katori"
        return '1 katori';
      })
      // Fix similar issues with other measurements
      .replace(/\bT glass\b/gi, '1 glass')
      .replace(/\bS glass\b/gi, '1 glass')
      .replace(/\bT bowl\b/gi, '1 bowl')
      .replace(/\bS bowl\b/gi, '1 bowl')
      .replace(/\bT roti\b/gi, '1 roti')
      .replace(/\bS roti\b/gi, '1 roti')
      .replace(/\bT rotis\b/gi, '1 rotis')
      .replace(/\bS rotis\b/gi, '1 rotis')
      .replace(/\bT chamach\b/gi, '1 chamach')
      .replace(/\bS chamach\b/gi, '1 chamach')
      .replace(/\bT mutthi\b/gi, '1 mutthi')
      .replace(/\bS mutthi\b/gi, '1 mutthi');
    
    // Fix missing portions for common food items that should have portions
    deduplicatedText = deduplicatedText
      // Add portions to roti/chapati/bread when missing - expanded to cover more variations
      .replace(/\bChanna Flour Roti\b(?!\s*\()/gi, 'Channa Flour Roti (2 pieces)')
      .replace(/\bBesan Roti\b(?!\s*\()/gi, 'Besan Roti (2 pieces)')
      .replace(/\bChickpea Flour Roti\b(?!\s*\()/gi, 'Chickpea Flour Roti (2 pieces)')
      .replace(/\bWhole Wheat Roti\b(?!\s*\()/gi, 'Whole Wheat Roti (2 pieces)')
      .replace(/\bMultigrain Roti\b(?!\s*\()/gi, 'Multigrain Roti (2 pieces)')
      .replace(/\bMillet Roti\b(?!\s*\()/gi, 'Millet Roti (2 pieces)')
      .replace(/\bBajra Roti\b(?!\s*\()/gi, 'Bajra Roti (2 pieces)')
      .replace(/\bJowar Roti\b(?!\s*\()/gi, 'Jowar Roti (2 pieces)')
      .replace(/\bRagi Roti\b(?!\s*\()/gi, 'Ragi Roti (2 pieces)')
      .replace(/\bOats Roti\b(?!\s*\()/gi, 'Oats Roti (2 pieces)')
      .replace(/\bBarley Roti\b(?!\s*\()/gi, 'Barley Roti (2 pieces)')
      .replace(/\bQuinoa Roti\b(?!\s*\()/gi, 'Quinoa Roti (2 pieces)')
      .replace(/\bBuckwheat Roti\b(?!\s*\()/gi, 'Buckwheat Roti (2 pieces)')
      .replace(/\bMixed Flour Roti\b(?!\s*\()/gi, 'Mixed Flour Roti (2 pieces)')
      .replace(/\bChapati\b(?!\s*\()/gi, 'Chapati (2 pieces)')
      .replace(/\bPhulka\b(?!\s*\()/gi, 'Phulka (2 pieces)')
      .replace(/\bParatha\b(?!\s*\()/gi, 'Paratha (1 piece)')
      .replace(/\bStuffed Paratha\b(?!\s*\()/gi, 'Stuffed Paratha (1 piece)')
      .replace(/\bNaan\b(?!\s*\()/gi, 'Naan (1 piece)')
      .replace(/\bKulcha\b(?!\s*\()/gi, 'Kulcha (1 piece)')
      .replace(/\bPuri\b(?!\s*\()/gi, 'Puri (2 pieces)')
      .replace(/\bBhatura\b(?!\s*\()/gi, 'Bhatura (1 piece)')
      // Add portions to dal when missing
      .replace(/\bUrad Dal\b(?!\s*\()/gi, 'Urad Dal (1 katori)')
      .replace(/\bMoong Dal\b(?!\s*\()/gi, 'Moong Dal (1 katori)')
      .replace(/\bToor Dal\b(?!\s*\()/gi, 'Toor Dal (1 katori)')
      .replace(/\bMasoor Dal\b(?!\s*\()/gi, 'Masoor Dal (1 katori)')
      .replace(/\bChana Dal\b(?!\s*\()/gi, 'Chana Dal (1 katori)')
      .replace(/\bArhar Dal\b(?!\s*\()/gi, 'Arhar Dal (1 katori)')
      .replace(/\bMixed Dal\b(?!\s*\()/gi, 'Mixed Dal (1 katori)')
      // Only add portions to standalone "curry" or "sabzi" words, not when they're part of a larger description
      .replace(/\b(?<![\w\s]and\s)curry\b(?!\s*\()/gi, 'mixed curry (1 katori)')
      .replace(/\b(?<![\w\s]and\s)sabzi\b(?!\s*\()/gi, 'mixed sabzi (1 katori)')
      // Fix rice portions
      .replace(/\bBrown Rice\b(?!\s*\()/gi, 'Brown Rice (1 katori)')
      .replace(/\bWhite Rice\b(?!\s*\()/gi, 'White Rice (1 katori)')
      .replace(/\bBasmati Rice\b(?!\s*\()/gi, 'Basmati Rice (1 katori)')
      .replace(/\bJeera Rice\b(?!\s*\()/gi, 'Jeera Rice (1 katori)')
      .replace(/\bPulao\b(?!\s*\()/gi, 'Pulao (1 katori)')
      .replace(/\bBiryani\b(?!\s*\()/gi, 'Biryani (1 katori)');
    
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
