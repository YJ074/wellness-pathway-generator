
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
