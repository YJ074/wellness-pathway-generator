
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/mealItemStyles';
import { dashPattern, measurementPatterns, localNameRegex } from '../constants/textPatterns';

// Process text with dash patterns (like "Rice Flakes - Poha")
// Fixed to prevent word repetition
export const processDashPatterns = (text: string): ReactNode[] => {
  try {
    const results: ReactNode[] = [];
    let lastIndex = 0;
    
    // Use a safe regex pattern with global flag
    const safePattern = new RegExp(dashPattern.source, "g");
    let match;
    
    while ((match = safePattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        results.push(text.substring(lastIndex, match.index));
      }
      
      // Add the base word
      results.push(match[1]);
      
      // Add dash character
      results.push(" - ");
      
      // Add the local name with highlighting
      results.push(
        <Text style={styles.localNamesHighlight}>
          {match[2]}
        </Text>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      results.push(text.substring(lastIndex));
    }
    
    return results;
  } catch (error) {
    console.error("Error processing dash patterns:", error);
    return [text];
  }
};

// Process measurements in text
// Fixed to prevent word repetition
export const processMeasurements = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Sort measurement patterns by length descending to match longer terms first
    const sortedMeasurementPatterns = [...measurementPatterns].sort((a, b) => 
      b.source.length - a.source.length
    );
    
    segments.forEach((segment, segmentIndex) => {
      // Skip non-string segments
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      let lastIndex = 0;
      let processed = false;
      const parts: (string | ReactNode)[] = [];
      
      // Process the segment with each measurement pattern
      for (const pattern of sortedMeasurementPatterns) {
        // Create a new regex for this iteration
        const safePattern = new RegExp(pattern.source, "gi");
        
        // Check if this pattern exists in the segment
        if (!safePattern.test(segment)) continue;
        
        // Reset regex lastIndex
        safePattern.lastIndex = 0;
        let matchFound = false;
        let matchIndex;
        
        // Find all matches for this pattern
        while ((matchIndex = safePattern.exec(segment)) !== null) {
          matchFound = true;
          
          // Add text before match if not already processed
          if (matchIndex.index > lastIndex) {
            parts.push(segment.substring(lastIndex, matchIndex.index));
          }
          
          // Add highlighted measurement
          parts.push(
            <Text key={`measure-${segmentIndex}-${matchIndex.index}`} style={styles.indianMeasurementHighlight}>
              {matchIndex[0]}
            </Text>
          );
          
          lastIndex = matchIndex.index + matchIndex[0].length;
        }
        
        if (matchFound) {
          processed = true;
        }
      }
      
      // Add any remaining unprocessed text
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
    console.error("Error processing measurements:", error);
    return segments;
  }
};

// Process local names in parentheses
// Fixed to prevent word repetition
export const processLocalNames = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    segments.forEach((segment, segmentIndex) => {
      // Skip already processed nodes
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Create a new regex for this iteration
      const safeLocalNameRegex = new RegExp(localNameRegex.source, "g");
      
      // Check if this pattern exists in the text
      if (!safeLocalNameRegex.test(segment)) {
        result.push(segment);
        return;
      }
      
      // Reset regex lastIndex
      safeLocalNameRegex.lastIndex = 0;
      
      let lastIndex = 0;
      const parts: (string | ReactNode)[] = [];
      let matchIndex;
      
      while ((matchIndex = safeLocalNameRegex.exec(segment)) !== null) {
        // Add text before match
        if (matchIndex.index > lastIndex) {
          parts.push(segment.substring(lastIndex, matchIndex.index));
        }
        
        // Add highlighted local name
        parts.push(
          <Text key={`local-${segmentIndex}-${matchIndex.index}`} style={styles.localNamesHighlight}>
            {matchIndex[0]}
          </Text>
        );
        
        lastIndex = matchIndex.index + matchIndex[0].length;
      }
      
      // Add remaining text
      if (lastIndex < segment.length) {
        parts.push(segment.substring(lastIndex));
      }
      
      // Add all parts to result
      parts.forEach(part => result.push(part));
    });
    
    return result;
  } catch (error) {
    console.error("Error processing local names:", error);
    return segments;
  }
};
