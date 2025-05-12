
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/mealItemStyles';
import { dashPattern, measurementPatterns, localNameRegex } from '../constants/textPatterns';

// Process text with dash patterns (like "Rice Flakes - Poha")
// Fixed to prevent word repetition
export const processDashPatterns = (text: string): ReactNode[] => {
  const results: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  // Use a new regex that won't create an infinite loop
  const safePattern = new RegExp(dashPattern.source, "g");
  
  while ((match = safePattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      results.push(text.substring(lastIndex, match.index));
    }
    
    // Add the base word
    results.push(match[1]);
    
    // Add the local name with highlighting
    results.push(
      <Text key={`dash-${match.index}`} style={styles.localNamesHighlight}>
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
};

// Process measurements in text
// Fixed to prevent word repetition
export const processMeasurements = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const result: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  // Sort measurement patterns by length descending to match longer terms first
  const sortedMeasurementPatterns = [...measurementPatterns].sort((a, b) => 
    b.source.length - a.source.length
  );
  
  for (const segment of segments) {
    // Skip non-string segments
    if (typeof segment !== 'string') {
      result.push(segment);
      continue;
    }
    
    let text = segment;
    let processedText = false;
    
    for (const pattern of sortedMeasurementPatterns) {
      // Create a new regex for this iteration to reset lastIndex
      const safePattern = new RegExp(pattern.source, "gi");
      
      // Check if this pattern exists in the text
      if (!safePattern.test(text)) continue;
      
      // Reset regex lastIndex
      safePattern.lastIndex = 0;
      
      // Process this measurement pattern
      const parts: (string | ReactNode)[] = [];
      let lastIndex = 0;
      let match;
      
      while ((match = safePattern.exec(text)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        
        // Add highlighted measurement
        parts.push(
          <Text key={`measure-${segmentId++}`} style={styles.indianMeasurementHighlight}>
            {match[0]}
          </Text>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after final match
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      // Rebuild the text for the next pattern
      text = '';
      for (const part of parts) {
        if (typeof part === 'string') {
          text += part;
        } else {
          result.push(part);
          processedText = true;
        }
      }
    }
    
    // Add any remaining text
    if (text) {
      result.push(text);
    } else if (!processedText) {
      result.push(segment);
    }
  }
  
  return result;
};

// Process local names in parentheses
// Fixed to prevent word repetition
export const processLocalNames = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const result: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    // Skip already processed nodes
    if (typeof segment !== 'string') {
      result.push(segment);
      continue;
    }
    
    // Create a new regex for this iteration to reset lastIndex
    const safeLocalNameRegex = new RegExp(localNameRegex.source, "g");
    
    // Check if this pattern exists in the text
    if (!safeLocalNameRegex.test(segment)) {
      result.push(segment);
      continue;
    }
    
    // Reset regex lastIndex
    safeLocalNameRegex.lastIndex = 0;
    
    // Split text at local name instances and process each part
    let lastIndex = 0;
    const parts: (string | ReactNode)[] = [];
    let match;
    
    while ((match = safeLocalNameRegex.exec(segment)) !== null) {
      // Skip if this is part of a measurement we already processed
      const isMeasurement = measurementPatterns.some(pattern => 
        new RegExp(pattern.source, "i").test(match[0])
      );
      
      if (!isMeasurement) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(segment.substring(lastIndex, match.index));
        }
        
        // Add highlighted local name
        parts.push(
          <Text key={`local-${segmentId++}`} style={styles.localNamesHighlight}>
            {match[0]}
          </Text>
        );
        
        lastIndex = match.index + match[0].length;
      } else {
        // Add text up to the end of this measurement
        if (match.index + match[0].length > lastIndex) {
          parts.push(segment.substring(lastIndex, match.index + match[0].length));
          lastIndex = match.index + match[0].length;
        }
      }
    }
    
    // Add remaining text
    if (lastIndex < segment.length) {
      parts.push(segment.substring(lastIndex));
    }
    
    // Add all parts to the result array
    parts.forEach(part => {
      result.push(part);
    });
  }
  
  return result;
};
