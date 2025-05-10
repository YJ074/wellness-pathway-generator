
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../styles/mealItemStyles';

// Helper function to determine if a fruit is a "big fruit" that should be measured in bowls
export const isBigFruit = (fruitName: string): boolean => {
  const bigFruits = [
    'watermelon', 'muskmelon', 'pineapple', 'papaya', 'jackfruit',
    'cantaloupe', 'honeydew', 'tarbuja', 'kharbooja', 'papita', 'kathal'
  ];
  
  return bigFruits.some(fruit => 
    fruitName.toLowerCase().includes(fruit.toLowerCase())
  );
};

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
export const formatMealDescription = (text: string) => {
  // Updated Indian household measurement patterns to include "nos" for count and "handful" for nuts
  const measurementPatterns = [
    /(\d+(?:\.\d+)?\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/gi,
    /(\d+(?:\.\d+)?\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/gi,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/gi,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/gi,
    /(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas))/gi,
    /(\(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas)\))/gi,
    /(\(?(?:small|medium)?\s*handful\)?)/gi,  // New pattern for handful measurements
    /(\((?:small|medium)?\s*handful\))/gi     // New pattern for parenthetical handful
  ];
  
  // First, handle patterns with dash like "Rice Flakes - Poha" or "Broken Wheat - Daliya"
  const dashParts = text.split(/(\s-\s[^,\.]+)/g);
  
  return dashParts.map((part, dashIndex) => {
    // If this part contains a dash with a local name
    if (part.match(/\s-\s[^,\.]+/)) {
      return <Text key={`dash-${dashIndex}`} style={styles.localNamesHighlight}>{part}</Text>;
    }
    
    // For regular text or parts without dashes, process parenthetical expressions
    const parentheticalParts = part.split(/(\([^)]+\))/g);
    
    return parentheticalParts.map((subPart, parenthIndex) => {
      // Check for Indian measurements first
      let isMeasurement = false;
      for (const pattern of measurementPatterns) {
        if (pattern.test(subPart)) {
          isMeasurement = true;
          // Reset the pattern's lastIndex to avoid issues with global flag
          pattern.lastIndex = 0;
          const parts = subPart.split(pattern);
          
          return parts.map((part, i) => {
            if (i % 2 === 0) {
              return <React.Fragment key={`text-${dashIndex}-${parenthIndex}-${i}`}>{part}</React.Fragment>;
            }
            return <Text key={`measure-${dashIndex}-${parenthIndex}-${i}`} style={styles.indianMeasurementHighlight}>{part}</Text>;
          });
        }
      }
      
      // If this is a parenthetical expression (likely a local name)
      if (subPart.startsWith('(') && subPart.endsWith(')')) {
        return <Text key={`parent-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{subPart}</Text>;
      }
      
      // Check for probiotic foods
      let foundProbiotic = false;
      for (const probiotic of probioticFoods) {
        if (subPart.toLowerCase().includes(probiotic.toLowerCase())) {
          foundProbiotic = true;
          const regex = new RegExp(`(${probiotic})`, 'gi');
          const parts = subPart.split(regex);
          
          return parts.map((probPart, probIndex) => {
            if (probPart.toLowerCase() === probiotic.toLowerCase()) {
              return <Text key={`prob-${dashIndex}-${parenthIndex}-${probIndex}`} style={styles.probioticHighlight}>{probPart}</Text>;
            }
            return <React.Fragment key={`text-prob-${dashIndex}-${parenthIndex}-${probIndex}`}>{probPart}</React.Fragment>;
          });
        }
      }
      
      // Check for prebiotic foods if no probiotic was found
      if (!foundProbiotic) {
        for (const prebiotic of prebioticFoods) {
          if (subPart.toLowerCase().includes(prebiotic.toLowerCase())) {
            const regex = new RegExp(`(${prebiotic})`, 'gi');
            const parts = subPart.split(regex);
            
            return parts.map((prePart, preIndex) => {
              if (prePart.toLowerCase() === prebiotic.toLowerCase()) {
                return <Text key={`pre-${dashIndex}-${parenthIndex}-${preIndex}`} style={styles.prebioticHighlight}>{prePart}</Text>;
              }
              return <React.Fragment key={`text-pre-${dashIndex}-${parenthIndex}-${preIndex}`}>{prePart}</React.Fragment>;
            });
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
          
          return parts.map((part, i) => {
            if (i % 2 === 0) {
              return <React.Fragment key={`text-bread-${dashIndex}-${parenthIndex}-${i}`}>{part}</React.Fragment>;
            }
            return <Text key={`bread-${dashIndex}-${parenthIndex}-${i}`} style={styles.indianMeasurementHighlight}>{part}</Text>;
          });
        }
      }
      
      // Check for specific millet patterns that might not be in parentheses or after dashes
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
      let formattedText = subPart;
      let matches = false;
      
      for (const pattern of milletPatterns) {
        if (pattern.test(formattedText)) {
          matches = true;
          break;
        }
      }
      
      if (matches) {
        return <Text key={`millet-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{formattedText}</Text>;
      }
      
      // Check for phrases indicating gut health benefits
      if (formattedText.toLowerCase().includes('for gut health') || 
          formattedText.toLowerCase().includes('prebiotic') ||
          formattedText.toLowerCase().includes('probiotic')) {
        return <Text key={`gut-${dashIndex}-${parenthIndex}`} style={styles.prebioticHighlight}>{formattedText}</Text>;
      }
      
      // Regular text
      return <React.Fragment key={`text-${dashIndex}-${parenthIndex}`}>{formattedText}</React.Fragment>;
    });
  });
};
