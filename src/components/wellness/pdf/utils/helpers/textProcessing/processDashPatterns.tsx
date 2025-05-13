
import React, { ReactNode } from 'react';
import { Text } from '@react-pdf/renderer';
import { styles } from '../../../styles/mealItemStyles';
import { dashPattern } from '../../constants/textPatterns';

// Helper function to deduplicate foods in the text
const deduplicateText = (text: string): string => {
  // First, normalize the text
  let cleanedText = text.replace(/\s+/g, ' ').trim();
  
  // List of common food items that get duplicated
  const foodItems = [
    "Chickoo", "cashews", "chia seeds", "flax seeds", "almonds", 
    "walnuts", "sprouts", "Dandelion Greens", "peanuts", "yogurt", 
    "curd", "dahi", "kombucha", "kefir", "cottage cheese", "buttermilk", "chaas",
    "sunflower seeds", "pumpkin seeds", "sesame seeds", "Banana",
    "Apple", "Mango", "Orange", "Papaya", "Watermelon", "Grapes",
    "Pomegranate", "Kiwi", "Berries", "Strawberries", "Blueberries",
    "Raspberries", "Blackberries", "Pineapple", "Guava", "Litchi",
    "Jackfruit", "Sapota", "Custard Apple"
  ];
  
  // Build a regex pattern for each food item with different conjunction patterns
  for (const food of foodItems) {
    // Handle "with X (portion), with X (portion)" pattern
    const withWithPattern = new RegExp(`with\\s+${food}\\s+\\([^)]+\\)([^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(withWithPattern, `with ${food} ($1)`);
    
    // Handle "and X (portion), and X (portion)" pattern
    const andAndPattern = new RegExp(`and\\s+${food}\\s+\\([^)]+\\)([^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(andAndPattern, `and ${food} ($1)`);
    
    // Handle "with X (portion), and X (portion)" pattern
    const withAndPattern = new RegExp(`with\\s+${food}\\s+\\([^)]+\\)([^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(withAndPattern, `with ${food} ($1)`);
    
    // Handle "and X (portion), with X (portion)" pattern
    const andWithPattern = new RegExp(`and\\s+${food}\\s+\\([^)]+\\)([^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(andWithPattern, `and ${food} ($1)`);
    
    // More aggressive - catch any duplicates regardless of connector words
    const anyPattern = new RegExp(`((?:with|and)\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and)\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(anyPattern, '$1');
    
    // Handle standalone duplicate mentions of the food item
    const standalonePattern = new RegExp(`${food}\\s+\\([^)]+\\)([^,]*),\\s*${food}\\s+\\([^)]+\\)`, 'gi');
    cleanedText = cleanedText.replace(standalonePattern, `${food} ($1)`);
  }
  
  // Remove repeated phrases that might have slipped through
  cleanedText = cleanedText.replace(/([^,\.]+)(,\s+)\1/g, '$1');
  
  // Clean up consecutive commas that might have been created during deduplication
  cleanedText = cleanedText.replace(/,\s*,/g, ',');
  
  // Fix comma followed by "and" or "with"
  cleanedText = cleanedText.replace(/,\s+(and|with)/g, ' $1');
  
  // Fix double "and" or "with" conjunctions
  cleanedText = cleanedText.replace(/\s+(and|with)\s+\1\s+/g, ' $1 ');
  
  return cleanedText;
};

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
    
    // First, deduplicate the text to remove any repetitions
    const cleanedText = deduplicateText(text);
    
    // Now process the dash patterns
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
