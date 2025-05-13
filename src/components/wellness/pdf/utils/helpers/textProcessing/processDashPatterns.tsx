
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../../styles/mealItemStyles';
import { dashPattern } from '../../constants/textPatterns';

// Process text with dash patterns (like "Rice Flakes - Poha")
export const processDashPatterns = (text: string): ReactNode[] => {
  try {
    const results: ReactNode[] = [];
    let lastIndex = 0;
    
    // Use a safe regex pattern with global flag
    const safePattern = new RegExp(dashPattern.source, "g");
    let match;
    
    // Handle case where input is already an array of nodes
    if (typeof text !== 'string') {
      console.error("processDashPatterns expected string but got", typeof text);
      return Array.isArray(text) ? text : [text];
    }
    
    // After deduplication, remove any repeated phrases that might have slipped through
    // This is a last line of defense against duplicates
    const cleanedText = text.replace(/([^,\.]+)(,\s+)\1/g, '$1');
    
    while ((match = safePattern.exec(cleanedText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        results.push(cleanedText.substring(lastIndex, match.index));
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
    if (lastIndex < cleanedText.length) {
      results.push(cleanedText.substring(lastIndex));
    }
    
    return results;
  } catch (error) {
    console.error("Error processing dash patterns:", error);
    return [text];
  }
};
