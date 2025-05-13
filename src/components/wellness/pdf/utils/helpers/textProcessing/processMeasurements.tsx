import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../../styles/mealItemStyles';
import { measurementPatterns } from '../../constants/textPatterns';

// Process measurements in text
export const processMeasurements = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Sort measurement patterns by length descending to match longer terms first
    const sortedMeasurementPatterns = [...measurementPatterns].sort((a, b) => 
      b.source.length - a.source.length
    );
    
    // Keep track of already processed text positions to prevent duplicates
    const processedRanges: {start: number, end: number}[] = [];
    
    // Process each segment
    for (const segment of segments) {
      // Skip non-string segments
      if (typeof segment !== 'string') {
        result.push(segment);
        continue;
      }
      
      const text = segment;
      let lastIndex = 0;
      const parts: (string | ReactNode)[] = [];
      let processed = false;
      
      // Process with each measurement pattern
      for (const pattern of sortedMeasurementPatterns) {
        // Create a new regex for this iteration
        const safePattern = new RegExp(pattern.source, "gi");
        let match;
        
        // Reset regex lastIndex
        safePattern.lastIndex = 0;
        
        while ((match = safePattern.exec(text)) !== null) {
          const matchStart = match.index;
          const matchEnd = match.index + match[0].length;
          
          // Check if this match overlaps with any previously processed range
          const overlaps = processedRanges.some(
            range => (matchStart >= range.start && matchStart < range.end) || 
                     (matchEnd > range.start && matchEnd <= range.end)
          );
          
          if (overlaps) continue; // Skip overlapping matches
          
          processed = true;
          
          // Add text before match
          if (matchStart > lastIndex) {
            parts.push(text.substring(lastIndex, matchStart));
          }
          
          // Add highlighted measurement
          parts.push(
            <Text style={styles.indianMeasurementHighlight}>
              {match[0]}
            </Text>
          );
          
          // Record this processed range
          processedRanges.push({start: matchStart, end: matchEnd});
          lastIndex = matchEnd;
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
    }
    
    return result;
  } catch (error) {
    console.error("Error processing measurements:", error);
    return segments;
  }
};
