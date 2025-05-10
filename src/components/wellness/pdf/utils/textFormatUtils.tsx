
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../styles/mealItemStyles';

// Enhanced function to highlight Indian measurements, local names, prebiotics, and probiotics
// Refactored to prevent text overlapping
export const formatMealDescription = (text: string): ReactNode[] => {
  // Process the text in sequence to avoid overlapping highlights
  let processedText = text;
  const results: ReactNode[] = [];
  
  // First process dash patterns (like "Rice Flakes - Poha")
  const dashRegex = /([^,\.]+)(\s-\s[^,\.]+)/g;
  let lastIndex = 0;
  let match;
  
  while ((match = dashRegex.exec(processedText)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      results.push(processedText.substring(lastIndex, match.index));
    }
    
    // Add the base word
    results.push(match[1]);
    
    // Add the local name with highlighting
    results.push(<Text key={`dash-${match.index}`} style={styles.localNamesHighlight}>{match[2]}</Text>);
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text
  if (lastIndex < processedText.length) {
    processedText = processedText.substring(lastIndex);
  } else {
    processedText = "";
  }
  
  // Process measurement patterns
  const measurementPatterns = [
    /(\d+(?:\.\d+)?\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/i,
    /(\d+(?:\.\d+)?\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?)/i,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/i,
    /(\((?:\d+(?:\.\d+)?|one|two|three|four|five|six)\s*(?:¼|½|¾)\s*(?:katori|glass|bowl|mutthi|chamach|nos|piece|pieces|idlis|dosas|chillas|small|medium|large|tbsp|tsp|cup)s?\))/i,
    /(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas))/i,
    /(\(\d+\s*(?:roti|rotis|chapati|chapatis|phulka|phulkas|dhokla|dhoklas)\))/i,
    /(\(?(?:small|medium)?\s*handful\)?)/i,
    /(\((?:small|medium)?\s*handful\))/i
  ];
  
  // Process each part sequentially
  // This approach prevents overlap by processing one pattern at a time
  let segments: (string | ReactNode)[] = [processedText]; // Fix: Explicitly define type as (string | ReactNode)[]
  let segmentId = 0;
  
  for (const pattern of measurementPatterns) {
    const newSegments: (string | ReactNode)[] = [];
    
    for (const segment of segments) {
      // Only process string segments
      if (typeof segment !== 'string') {
        newSegments.push(segment);
        continue;
      }
      
      let segmentText = segment;
      let lastPos = 0;
      let matchResult;
      
      while ((matchResult = pattern.exec(segmentText.substring(lastPos))) !== null) {
        const matchPos = lastPos + matchResult.index;
        
        // Add text before the match
        if (matchPos > lastPos) {
          newSegments.push(segmentText.substring(lastPos, matchPos));
        }
        
        // Add the matched measurement with highlighting
        newSegments.push(
          <Text 
            key={`measure-${segmentId++}`} 
            style={styles.indianMeasurementHighlight}
          >
            {matchResult[0]}
          </Text>
        );
        
        lastPos = matchPos + matchResult[0].length;
      }
      
      // Add any remaining text
      if (lastPos < segmentText.length) {
        newSegments.push(segmentText.substring(lastPos));
      }
    }
    
    segments = newSegments;
  }
  
  // Process parenthetical expressions (local names)
  const newSegments: (string | ReactNode)[] = [];
  
  for (const segment of segments) {
    // Skip already processed nodes
    if (typeof segment !== 'string') {
      newSegments.push(segment);
      continue;
    }
    
    const localNameRegex = /\(([^)]+)\)/g;
    let segmentText = segment;
    let lastPos = 0;
    let matchResult;
    
    while ((matchResult = localNameRegex.exec(segmentText)) !== null) {
      // Check if this is already a measurement pattern we processed
      const isMeasurement = measurementPatterns.some(pattern => pattern.test(matchResult[0]));
      
      if (!isMeasurement) {
        // Add text before the match
        if (matchResult.index > lastPos) {
          newSegments.push(segmentText.substring(lastPos, matchResult.index));
        }
        
        // Add the local name with highlighting
        newSegments.push(
          <Text 
            key={`local-${segmentId++}`} 
            style={styles.localNamesHighlight}
          >
            {matchResult[0]}
          </Text>
        );
        
        lastPos = matchResult.index + matchResult[0].length;
      }
    }
    
    // Add any remaining text
    if (lastPos < segmentText.length) {
      newSegments.push(segmentText.substring(lastPos));
    }
  }
  
  segments = newSegments;
  
  // Process prebiotic and probiotic foods
  // Probiotics first
  const probioticSegments: (string | ReactNode)[] = [];
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      probioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    
    for (const probiotic of probioticFoods) {
      const regex = new RegExp(`(${probiotic})`, 'i');
      if (regex.test(segment)) {
        const parts = segment.split(regex);
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].toLowerCase() === probiotic.toLowerCase()) {
            probioticSegments.push(
              <Text 
                key={`prob-${segmentId++}`} 
                style={styles.probioticHighlight}
              >
                {parts[i]}
              </Text>
            );
          } else if (parts[i]) {
            probioticSegments.push(parts[i]);
          }
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      probioticSegments.push(segment);
    }
  }
  
  // Then prebiotics
  const prebioticSegments: (string | ReactNode)[] = [];
  
  for (const segment of probioticSegments) {
    if (typeof segment !== 'string') {
      prebioticSegments.push(segment);
      continue;
    }
    
    let processed = false;
    
    for (const prebiotic of prebioticFoods) {
      const regex = new RegExp(`(${prebiotic})`, 'i');
      if (regex.test(segment)) {
        const parts = segment.split(regex);
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].toLowerCase() === prebiotic.toLowerCase()) {
            prebioticSegments.push(
              <Text 
                key={`pre-${segmentId++}`} 
                style={styles.prebioticHighlight}
              >
                {parts[i]}
              </Text>
            );
          } else if (parts[i]) {
            prebioticSegments.push(parts[i]);
          }
        }
        
        processed = true;
        break;
      }
    }
    
    if (!processed) {
      prebioticSegments.push(segment);
    }
  }
  
  // Return the final processed segments
  return prebioticSegments;
};
