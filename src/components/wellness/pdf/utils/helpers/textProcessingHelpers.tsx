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

// Process local names in parentheses
// Fixed to prevent word repetition
export const processLocalNames = (segments: (string | ReactNode)[]): (string | ReactNode)[] => {
  try {
    const result: (string | ReactNode)[] = [];
    
    // Keep track of already processed text positions to prevent duplicates
    const processedLocalNames = new Set<string>();
    
    segments.forEach(segment => {
      // Skip already processed nodes
      if (typeof segment !== 'string') {
        result.push(segment);
        return;
      }
      
      // Create a new regex for this iteration
      const safeLocalNameRegex = new RegExp(localNameRegex.source, "g");
      let match;
      
      let text = segment;
      let lastIndex = 0;
      const parts: (string | ReactNode)[] = [];
      let processed = false;
      
      // Reset regex lastIndex
      safeLocalNameRegex.lastIndex = 0;
      
      while ((match = safeLocalNameRegex.exec(text)) !== null) {
        const localName = match[0];
        
        // Skip if we've already processed this exact local name in this segment
        if (processedLocalNames.has(localName)) continue;
        
        processed = true;
        
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        
        // Add highlighted local name
        parts.push(
          <Text style={styles.localNamesHighlight}>
            {localName}
          </Text>
        );
        
        // Record this processed local name
        processedLocalNames.add(localName);
        lastIndex = match.index + localName.length;
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
    console.error("Error processing local names:", error);
    return segments;
  }
};
