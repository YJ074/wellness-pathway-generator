
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Improved process probiotic foods to prevent overlapping and repetition
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Create a copy of probioticFoods and sort by length descending to match longer terms first
    const sortedProbiotics = [...probioticFoods].sort((a, b) => b.length - a.length);
    
    segments.forEach((segment, segmentIndex) => {
      // If it's not a string (already processed), just add it directly
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Skip processing if this is a health benefit note
      if (segment.includes('Contains probiotics') || 
          segment.includes('♥ Contains')) {
        result.push(segment);
        return;
      }
      
      let lastIndex = 0;
      let processed = false;
      const parts: (string | ReactNode)[] = [];
      
      for (const probiotic of sortedProbiotics) {
        // Use word boundary for more precise matching
        const regex = new RegExp(`\\b(${probiotic})\\b`, 'gi');
        
        // Check if this probiotic exists in the segment
        if (!regex.test(segment)) continue;
        
        // Reset regex
        regex.lastIndex = 0;
        let matchFound = false;
        let matchIndex;
        
        // Find all matches for this probiotic
        while ((matchIndex = regex.exec(segment)) !== null) {
          // Skip if this part was already processed
          if (matchIndex.index < lastIndex) continue;
          
          matchFound = true;
          
          // Add text before match
          if (matchIndex.index > lastIndex) {
            parts.push(segment.substring(lastIndex, matchIndex.index));
          }
          
          // Add highlighted probiotic
          parts.push(
            <Text key={`prob-${segmentIndex}-${matchIndex.index}`} style={styles.probioticHighlight}>
              {matchIndex[0]}
            </Text>
          );
          
          lastIndex = matchIndex.index + matchIndex[0].length;
        }
        
        if (matchFound) {
          processed = true;
        }
      }
      
      // Add any remaining text
      if (lastIndex < segment.length) {
        parts.push(segment.substring(lastIndex));
      }
      
      // Add all parts to result
      if (processed && parts.length > 0) {
        parts.forEach(part => result.push(part));
      } else {
        // If no processing was done, add the original segment
        result.push(segment);
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error processing probiotic foods:", error);
    return segments;
  }
};

// Improved process prebiotic foods to prevent overlapping and repetition
export const processPrebioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Create a copy of prebioticFoods and sort by length descending to match longer terms first
    const sortedPrebiotics = [...prebioticFoods].sort((a, b) => b.length - a.length);
    
    segments.forEach((segment, segmentIndex) => {
      // If it's not a string (already processed), just add it directly
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Skip processing if this is a health benefit note
      if (segment.includes('Contains prebiotic') || 
          segment.includes('♥ Contains')) {
        result.push(segment);
        return;
      }
      
      let lastIndex = 0;
      let processed = false;
      const parts: (string | ReactNode)[] = [];
      
      for (const prebiotic of sortedPrebiotics) {
        // Use word boundary for more precise matching
        const regex = new RegExp(`\\b(${prebiotic})\\b`, 'gi');
        
        // Check if this prebiotic exists in the segment
        if (!regex.test(segment)) continue;
        
        // Reset regex
        regex.lastIndex = 0;
        let matchFound = false;
        let matchIndex;
        
        // Find all matches for this prebiotic
        while ((matchIndex = regex.exec(segment)) !== null) {
          // Skip if this part was already processed
          if (matchIndex.index < lastIndex) continue;
          
          matchFound = true;
          
          // Add text before match
          if (matchIndex.index > lastIndex) {
            parts.push(segment.substring(lastIndex, matchIndex.index));
          }
          
          // Add highlighted prebiotic
          parts.push(
            <Text key={`pre-${segmentIndex}-${matchIndex.index}`} style={styles.prebioticHighlight}>
              {matchIndex[0]}
            </Text>
          );
          
          lastIndex = matchIndex.index + matchIndex[0].length;
        }
        
        if (matchFound) {
          processed = true;
        }
      }
      
      // Add any remaining text
      if (lastIndex < segment.length) {
        parts.push(segment.substring(lastIndex));
      }
      
      // Add all parts to result
      if (processed && parts.length > 0) {
        parts.forEach(part => result.push(part));
      } else {
        // If no processing was done, add the original segment
        result.push(segment);
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error processing prebiotic foods:", error);
    return segments;
  }
};
