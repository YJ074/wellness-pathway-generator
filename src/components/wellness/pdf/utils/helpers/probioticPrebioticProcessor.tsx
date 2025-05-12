import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { prebioticFoods, probioticFoods } from '@/utils/diet/helpers/prebioticProbioticHelper';
import { styles } from '../../styles/mealItemStyles';

// Improved process probiotic foods to prevent overlapping and repetition
export const processProbioticFoods = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Sort probiotic foods by length to match longer terms first
    const sortedProbiotics = [...probioticFoods].sort((a, b) => b.length - a.length);
    
    // Track already highlighted probiotic terms to avoid duplicates
    const highlightedProbiotics = new Set<string>();
    
    // Process each segment
    segments.forEach(segment => {
      // If it's not a string (already processed), just add it directly
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Skip processing if this is a health benefit note
      if (segment.includes('Contains probiotics') || segment.includes('♥ Contains')) {
        result.push(segment);
        return;
      }
      
      const text = segment;
      let lastIndex = 0;
      const parts: (string | ReactNode)[] = [];
      let processed = false;
      
      // Process each probiotic term
      for (const probiotic of sortedProbiotics) {
        // Use word boundary for more precise matching
        const regex = new RegExp(`\\b(${probiotic})\\b`, 'gi');
        let match;
        
        // Reset regex
        regex.lastIndex = 0;
        
        while ((match = regex.exec(text)) !== null) {
          // Get matched term and position
          const matchedTerm = match[0];
          const position = `${matchedTerm}_${match.index}`;
          
          // Skip if we've already highlighted this term at this position
          if (highlightedProbiotics.has(position)) continue;
          
          processed = true;
          
          // Add text before match
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }
          
          // Add highlighted probiotic
          parts.push(
            <Text style={styles.probioticHighlight}>
              {matchedTerm}
            </Text>
          );
          
          // Record this processed term and position
          highlightedProbiotics.add(position);
          lastIndex = match.index + matchedTerm.length;
        }
      }
      
      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      // If processing happened, add all parts
      if (processed && parts.length > 0) {
        result.push(...parts);
      } else {
        // Otherwise add original segment
        result.push(text);
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
    
    // Sort prebiotic foods by length to match longer terms first
    const sortedPrebiotics = [...prebioticFoods].sort((a, b) => b.length - a.length);
    
    // Track already highlighted prebiotic terms to avoid duplicates
    const highlightedPrebiotics = new Set<string>();
    
    // Process each segment
    segments.forEach(segment => {
      // If it's not a string (already processed), just add it directly
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Skip processing if this is a health benefit note
      if (segment.includes('Contains prebiotic') || segment.includes('♥ Contains')) {
        result.push(segment);
        return;
      }
      
      const text = segment;
      let lastIndex = 0;
      const parts: (string | ReactNode)[] = [];
      let processed = false;
      
      // Process each prebiotic term
      for (const prebiotic of sortedPrebiotics) {
        // Use word boundary for more precise matching
        const regex = new RegExp(`\\b(${prebiotic})\\b`, 'gi');
        let match;
        
        // Reset regex
        regex.lastIndex = 0;
        
        while ((match = regex.exec(text)) !== null) {
          // Get matched term and position
          const matchedTerm = match[0];
          const position = `${matchedTerm}_${match.index}`;
          
          // Skip if we've already highlighted this term at this position
          if (highlightedPrebiotics.has(position)) continue;
          
          processed = true;
          
          // Add text before match
          if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
          }
          
          // Add highlighted prebiotic
          parts.push(
            <Text style={styles.prebioticHighlight}>
              {matchedTerm}
            </Text>
          );
          
          // Record this processed term and position
          highlightedPrebiotics.add(position);
          lastIndex = match.index + matchedTerm.length;
        }
      }
      
      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      // If processing happened, add all parts
      if (processed && parts.length > 0) {
        result.push(...parts);
      } else {
        // Otherwise add original segment
        result.push(text);
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error processing prebiotic foods:", error);
    return segments;
  }
};
