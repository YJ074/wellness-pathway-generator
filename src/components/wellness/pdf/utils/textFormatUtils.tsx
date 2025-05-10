import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../styles/mealItemStyles';
import { isBigFruit, isKatoriFruit } from '@/utils/diet/helpers/portionHelpers';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
export const formatMealDescription = (text: string): ReactNode[] => {
  // Updated Indian household measurement patterns to include "nos" for count and "handful" for nuts
  const measurementPatterns = [
    /(\d+(?:\.\d+)?\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/gi,
    /(\d+(?:\.\d+)?\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/gi,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/gi,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/gi,
    /(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas))/gi,
    /(\(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas)\))/gi,
    /(\(?(?:small|medium)?\s*handful\)?)/gi,
    /(\((?:small|medium)?\s*handful\))/gi
  ];
  
  // First, handle patterns with dash like "Rice Flakes - Poha" or "Broken Wheat - Daliya"
  const dashParts = text.split(/(\s-\s[^,\.]+)/g);
  const results: ReactNode[] = [];
  
  dashParts.forEach((part, dashIndex) => {
    // If this part contains a dash with a local name
    if (part.match(/\s-\s[^,\.]+/)) {
      results.push(<Text key={`dash-${dashIndex}`} style={styles.localNamesHighlight}>{part}</Text>);
      return;
    }
    
    // For regular text or parts without dashes, process parenthetical expressions
    const parentheticalParts = part.split(/(\([^)]+\))/g);
    
    parentheticalParts.forEach((subPart, parenthIndex) => {
      // Check for Indian measurements first
      let isMeasurement = false;
      
      for (const pattern of measurementPatterns) {
        if (pattern.test(subPart)) {
          isMeasurement = true;
          // Reset the pattern's lastIndex to avoid issues with global flag
          pattern.lastIndex = 0;
          const parts = subPart.split(pattern);
          
          parts.forEach((measurePart, i) => {
            if (i % 2 === 0) {
              if (measurePart) {
                results.push(measurePart);
              }
            } else {
              results.push(<Text key={`measure-${dashIndex}-${parenthIndex}-${i}`} style={styles.indianMeasurementHighlight}>{measurePart}</Text>);
            }
          });
          return;
        }
      }
      
      // If this is a parenthetical expression (likely a local name)
      if (subPart.startsWith('(') && subPart.endsWith(')')) {
        results.push(<Text key={`parent-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{subPart}</Text>);
        return;
      }
      
      // Check for probiotic foods
      let foundProbiotic = false;
      for (const probiotic of probioticFoods) {
        if (subPart.toLowerCase().includes(probiotic.toLowerCase())) {
          foundProbiotic = true;
          const regex = new RegExp(`(${probiotic})`, 'gi');
          const parts = subPart.split(regex);
          
          parts.forEach((probPart, probIndex) => {
            if (probPart.toLowerCase() === probiotic.toLowerCase()) {
              results.push(<Text key={`prob-${dashIndex}-${parenthIndex}-${probIndex}`} style={styles.probioticHighlight}>{probPart}</Text>);
            } else if (probPart) {
              results.push(probPart);
            }
          });
          return;
        }
      }
      
      // Check for prebiotic foods if no probiotic was found
      if (!foundProbiotic) {
        for (const prebiotic of prebioticFoods) {
          if (subPart.toLowerCase().includes(prebiotic.toLowerCase())) {
            const regex = new RegExp(`(${prebiotic})`, 'gi');
            const parts = subPart.split(regex);
            
            parts.forEach((prePart, preIndex) => {
              if (prePart.toLowerCase() === prebiotic.toLowerCase()) {
                results.push(<Text key={`pre-${dashIndex}-${parenthIndex}-${preIndex}`} style={styles.prebioticHighlight}>{prePart}</Text>);
              } else if (prePart) {
                results.push(prePart);
              }
            });
            return;
          }
        }
      }
      
      // Check for roti/chapati/phulka numbers
      const breadPatterns = [
        /(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas))/gi
      ];
      
      for (const pattern of breadPatterns) {
        if (pattern.test(subPart)) {
          pattern.lastIndex = 0;
          const parts = subPart.split(pattern);
          
          parts.forEach((part, i) => {
            if (i % 2 === 0) {
              if (part) {
                results.push(part);
              }
            } else {
              results.push(<Text key={`bread-${dashIndex}-${parenthIndex}-${i}`} style={styles.indianMeasurementHighlight}>{part}</Text>);
            }
          });
          return;
        }
      }
      
      // Check for specific millet patterns
      const milletPatterns = [
        /(Foxtail Millet|Kangni)/, 
        /(Pearl Millet|Bajra)/, 
        /(Finger Millet|Ragi)/, 
        /(Sorghum|Jowar)/, 
        /(Little Millet|Kutki)/,
        /(Proso Millet|Barri)/,
        /(Kodo Millet|Kodra)/,
        /(Barnyard Millet|Samvat)/,
        /(Amaranth|Rajgira)/,
        /(Buckwheat|Kuttu)/,
        /(Rice Flakes|Poha)/,
        /(Broken Wheat|Daliya|Dalia)/,
        /(Brown Rice|Bhura Chaval)/,
        /(White Rice|Safed Chaval)/,
        /(Ragi Roti|Finger Millet Roti)/,
        /(Bajra Roti|Pearl Millet Roti)/,
        /(Jowar Roti|Sorghum Roti)/,
        /(Kangni Roti|Foxtail Millet Roti)/,
        /(Kutki Roti|Little Millet Roti)/
      ];
      
      // Check each pattern and add highlighting if found
      let matches = false;
      
      for (const pattern of milletPatterns) {
        if (pattern.test(subPart)) {
          matches = true;
          break;
        }
      }
      
      if (matches) {
        results.push(<Text key={`millet-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{subPart}</Text>);
        return;
      }
      
      // Check for gut health phrases
      if (subPart.toLowerCase().includes('for gut health') || 
          subPart.toLowerCase().includes('prebiotic') ||
          subPart.toLowerCase().includes('probiotic')) {
        results.push(<Text key={`gut-${dashIndex}-${parenthIndex}`} style={styles.prebioticHighlight}>{subPart}</Text>);
        return;
      }
      
      // Regular text
      if (subPart) {
        results.push(subPart);
      }
    });
  });
  
  return results;
};
