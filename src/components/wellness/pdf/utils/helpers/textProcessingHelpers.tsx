
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../styles/mealItemStyles';
import { dashPattern, measurementPatterns, localNameRegex } from '../constants/textPatterns';

// Process text with dash patterns (like "Rice Flakes - Poha")
export const processDashPatterns = (text: string): ReactNode[] => {
  const results: ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  while ((match = dashPattern.exec(text)) !== null) {
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
export const processMeasurements = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  let segmentId = 0;
  let result: (string | ReactNode)[] = segments;
  
  for (const pattern of measurementPatterns) {
    const newSegments: (string | ReactNode)[] = [];
    
    for (const segment of result) {
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
    
    result = newSegments;
  }
  
  return result;
};

// Process local names in parentheses
export const processLocalNames = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  const newSegments: (string | ReactNode)[] = [];
  let segmentId = 0;
  
  for (const segment of segments) {
    // Skip already processed nodes
    if (typeof segment !== 'string') {
      newSegments.push(segment);
      continue;
    }
    
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
  
  return newSegments;
};
