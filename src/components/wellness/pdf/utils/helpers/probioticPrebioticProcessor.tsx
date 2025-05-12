
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Fixed process probiotic foods to prevent overlapping and repetition
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const probioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      probioticSegments.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains probiotics for gut health') || 
        segment.startsWith('♥ Contains probiotics')) {
      probioticSegments.push(segment);
      continue;
    }
    
    let remainingText = segment;
    let foundProbiotics = false;
    
    for (const probiotic of probioticFoods) {
      // Use word boundaries for more precise matching
      const regex = new RegExp(`\\b(${probiotic})\\b`, 'gi');
      
      // Check if this probiotic exists in the text
      if (!regex.test(remainingText)) continue;
      
      // Reset regex since test() advances the lastIndex
      regex.lastIndex = 0;
      
      // Split text at probiotic instances and process each part
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(remainingText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(remainingText.substring(lastIndex, match.index));
        }
        
        // Add highlighted probiotic
        parts.push(
          <Text key={`prob-${segmentId++}`} style={styles.probioticHighlight}>
            {match[0]}
          </Text>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after final match
      if (lastIndex < remainingText.length) {
        parts.push(remainingText.substring(lastIndex));
      }
      
      // Replace original text with processed parts
      if (parts.length > 0) {
        remainingText = '';
        parts.forEach(part => {
          if (typeof part === 'string') {
            remainingText += part;
          } else {
            probioticSegments.push(part);
          }
        });
        foundProbiotics = true;
      }
    }
    
    // Add remaining text if there's any
    if (remainingText || !foundProbiotics) {
      if (typeof segment === 'string' && !foundProbiotics) {
        probioticSegments.push(segment);
      } else if (remainingText) {
        probioticSegments.push(remainingText);
      }
    }
  }
  
  return probioticSegments;
};

// Fixed process prebiotic foods to prevent overlapping and repetition
export const processPrebioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const prebioticSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    if (typeof segment !== 'string') {
      prebioticSegments.push(segment);
      continue;
    }
    
    // Skip processing if this is a health benefit note
    if (segment.startsWith('Contains probiotics for gut health') || 
        segment.startsWith('♥ Contains')) {
      prebioticSegments.push(segment);
      continue;
    }
    
    let remainingText = segment;
    let foundPrebiotics = false;
    
    for (const prebiotic of prebioticFoods) {
      // Use word boundaries for precise matching
      const regex = new RegExp(`\\b(${prebiotic})\\b`, 'gi');
      
      // Check if this prebiotic exists in the text
      if (!regex.test(remainingText)) continue;
      
      // Reset regex since test() advances the lastIndex
      regex.lastIndex = 0;
      
      // Split text at prebiotic instances and process each part
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = regex.exec(remainingText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(remainingText.substring(lastIndex, match.index));
        }
        
        // Add highlighted prebiotic
        parts.push(
          <Text key={`pre-${segmentId++}`} style={styles.prebioticHighlight}>
            {match[0]}
          </Text>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after final match
      if (lastIndex < remainingText.length) {
        parts.push(remainingText.substring(lastIndex));
      }
      
      // Replace original text with processed parts
      if (parts.length > 0) {
        remainingText = '';
        parts.forEach(part => {
          if (typeof part === 'string') {
            remainingText += part;
          } else {
            prebioticSegments.push(part);
          }
        });
        foundPrebiotics = true;
      }
    }
    
    // Add remaining text if there's any
    if (remainingText || !foundPrebiotics) {
      if (typeof segment === 'string' && !foundPrebiotics) {
        prebioticSegments.push(segment);
      } else if (remainingText) {
        prebioticSegments.push(remainingText);
      }
    }
  }
  
  return prebioticSegments;
};
