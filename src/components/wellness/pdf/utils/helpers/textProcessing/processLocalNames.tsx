import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../../styles/mealItemStyles';
import { localNameRegex } from '../../constants/textPatterns';

// Process local names in parentheses
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
