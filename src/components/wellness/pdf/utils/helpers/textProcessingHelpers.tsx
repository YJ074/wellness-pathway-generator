
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
  let segmentId = 0;
  const newSegments: (string | ReactNode)[] = [];
  
  for (const segment of segments) {
    // Skip non-string segments
    if (typeof segment !== 'string') {
      newSegments.push(segment);
      continue;
    }
    
    let remainingText = segment;
    let processedAny = false;
    
    for (const pattern of measurementPatterns) {
      // Create a new regex for this iteration to reset lastIndex
      const safePattern = new RegExp(pattern.source, "gi");
      
      // Check if this pattern exists in the text
      if (!safePattern.test(remainingText)) continue;
      
      // Reset regex lastIndex
      safePattern.lastIndex = 0;
      
      // Split text at measurement instances and process each part
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = safePattern.exec(remainingText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(remainingText.substring(lastIndex, match.index));
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
      if (lastIndex < remainingText.length) {
        parts.push(remainingText.substring(lastIndex));
      }
      
      // Update the text to process for the next pattern
      if (parts.length > 0) {
        let newText = '';
        parts.forEach(part => {
          if (typeof part === 'string') {
            newText += part;
          } else {
            newSegments.push(part);
          }
        });
        remainingText = newText;
        processedAny = true;
      }
    }
    
    // Add any remaining text
    if (remainingText || !processedAny) {
      if (typeof segment === 'string' && !processedAny) {
        newSegments.push(segment);
      } else if (remainingText) {
        newSegments.push(remainingText);
      }
    }
  }
  
  return newSegments;
};

// Process local names in parentheses
// Fixed to prevent word repetition
export const processLocalNames = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const newSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    // Skip already processed nodes
    if (typeof segment !== 'string') {
      newSegments.push(segment);
      continue;
    }
    
    // Create a new regex for this iteration to reset lastIndex
    const safeLocalNameRegex = new RegExp(localNameRegex.source, "g");
    
    // Check if this pattern exists in the text
    if (!safeLocalNameRegex.test(segment)) {
      newSegments.push(segment);
      continue;
    }
    
    // Reset regex lastIndex
    safeLocalNameRegex.lastIndex = 0;
    
    // Split text at local name instances and process each part
    let lastIndex = 0;
    const parts = [];
    let match;
    
    while ((match = safeLocalNameRegex.exec(segment)) !== null) {
      // Check if this is already a measurement pattern we processed
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
    
    // Add all parts to the new segments array
    parts.forEach(part => {
      newSegments.push(part);
    });
  }
  
  return newSegments;
};
