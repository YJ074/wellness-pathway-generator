
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Fixed process probiotic foods to prevent overlapping and repetition
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const result: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    // If it's not a string (already processed), just add it directly
    if (typeof segment !== 'string') {
      result.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains probiotics for gut health') || 
        segment.startsWith('♥ Contains probiotics')) {
      result.push(segment);
      continue;
    }
    
    const parts: (string | ReactNode)[] = [];
    let lastIndex = 0;
    let text = segment;
    
    // Create a copy of probioticFoods and sort by length descending to match longer terms first
    const sortedProbiotics = [...probioticFoods].sort((a, b) => b.length - a.length);
    
    for (const probiotic of sortedProbiotics) {
      // Use word boundary for more precise matching
      const regex = new RegExp(`\\b(${probiotic})\\b`, 'gi');
      let match;
      
      // Reset regex
      regex.lastIndex = 0;
      
      // Create a temporary working copy for this probiotic
      let workingText = text;
      const tempParts: (string | ReactNode)[] = [];
      let tempLastIndex = 0;
      let foundMatch = false;
      
      while ((match = regex.exec(workingText)) !== null) {
        foundMatch = true;
        
        // Add text before match
        if (match.index > tempLastIndex) {
          tempParts.push(workingText.substring(tempLastIndex, match.index));
        }
        
        // Add highlighted probiotic
        tempParts.push(
          <Text key={`prob-${segmentId++}`} style={styles.probioticHighlight}>
            {match[0]}
          </Text>
        );
        
        tempLastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (tempLastIndex < workingText.length) {
        tempParts.push(workingText.substring(tempLastIndex));
      }
      
      // If we found matches, update our working text for the next probiotic
      if (foundMatch) {
        text = ''; // Clear the text as we'll rebuild it
        
        // Rebuild the text from parts for the next iteration
        for (const part of tempParts) {
          if (typeof part === 'string') {
            text += part;
          } else {
            parts.push(part);
          }
        }
      }
    }
    
    // Add any remaining text
    if (text) {
      result.push(text);
    }
    
    // Add any highlighted parts
    for (const part of parts) {
      if (typeof part !== 'string') {
        result.push(part);
      }
    }
  }
  
  return result;
};

// Fixed process prebiotic foods to prevent overlapping and repetition
export const processPrebioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const result: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    // If it's not a string (already processed), just add it directly
    if (typeof segment !== 'string') {
      result.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains prebiotic') || 
        segment.startsWith('♥ Contains')) {
      result.push(segment);
      continue;
    }
    
    const parts: (string | ReactNode)[] = [];
    let lastIndex = 0;
    let text = segment;
    
    // Create a copy of prebioticFoods and sort by length descending to match longer terms first
    const sortedPrebiotics = [...prebioticFoods].sort((a, b) => b.length - a.length);
    
    for (const prebiotic of sortedPrebiotics) {
      // Use word boundary for more precise matching
      const regex = new RegExp(`\\b(${prebiotic})\\b`, 'gi');
      let match;
      
      // Reset regex
      regex.lastIndex = 0;
      
      // Create a temporary working copy for this prebiotic
      let workingText = text;
      const tempParts: (string | ReactNode)[] = [];
      let tempLastIndex = 0;
      let foundMatch = false;
      
      while ((match = regex.exec(workingText)) !== null) {
        foundMatch = true;
        
        // Add text before match
        if (match.index > tempLastIndex) {
          tempParts.push(workingText.substring(tempLastIndex, match.index));
        }
        
        // Add highlighted prebiotic
        tempParts.push(
          <Text key={`pre-${segmentId++}`} style={styles.prebioticHighlight}>
            {match[0]}
          </Text>
        );
        
        tempLastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (tempLastIndex < workingText.length) {
        tempParts.push(workingText.substring(tempLastIndex));
      }
      
      // If we found matches, update our working text for the next prebiotic
      if (foundMatch) {
        text = ''; // Clear the text as we'll rebuild it
        
        // Rebuild the text from parts for the next iteration
        for (const part of tempParts) {
          if (typeof part === 'string') {
            text += part;
          } else {
            parts.push(part);
          }
        }
      }
    }
    
    // Add any remaining text
    if (text) {
      result.push(text);
    }
    
    // Add any highlighted parts
    for (const part of parts) {
      if (typeof part !== 'string') {
        result.push(part);
      }
    }
  }
  
  return result;
};
