
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/pdfCalorieUtils';

const styles = StyleSheet.create({
  mealItem: {
    marginBottom: 12,
  },
  mealLabel: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  mealDescription: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  calorieInfo: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  localNamesHighlight: {
    fontFamily: 'Roboto',
    fontWeight: 700,
  }
});

interface PDFMealItemProps {
  label: string;
  description: string;
  mealType: string;
  dailyCalories: number;
  goalFactor: number;
}

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor 
}: PDFMealItemProps) => {
  // Enhanced function to highlight local names in parentheses, with a dash, or specific millet patterns
  const formatMealDescription = (text: string) => {
    // First, handle patterns with dash like "Rice Flakes - Poha" or "Broken Wheat - Daliya"
    const dashParts = text.split(/(\s-\s[^,\.]+)/g);
    
    return dashParts.map((part, dashIndex) => {
      // If this part contains a dash with a local name
      if (part.match(/\s-\s[^,\.]+/)) {
        return <Text key={`dash-${dashIndex}`} style={styles.localNamesHighlight}>{part}</Text>;
      }
      
      // For regular text or parts without dashes, process parenthetical expressions
      const parentheticalParts = part.split(/(\([^)]+\))/g);
      
      return parentheticalParts.map((subPart, parenthIndex) => {
        // If this is a parenthetical expression (likely a local name)
        if (subPart.startsWith('(') && subPart.endsWith(')')) {
          return <Text key={`parent-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{subPart}</Text>;
        }
        
        // Check for specific millet patterns that might not be in parentheses or after dashes
        const milletPatterns = [
          /(Foxtail Millet|Kangni)/, 
          /(Pearl Millet|Bajra)/, 
          /(Finger Millet|Ragi)/, 
          /(Sorghum|Jowar)/, 
          /(Little Millet|Kutki)/,
          /(Proso Millet|Barri)/,
          /(Kodo Millet|Kodra)/,
          /(Barnyard Millet|Samvat)/,
          /(Amaranth|Rajgira)/,
          /(Buckwheat|Kuttu)/,
          /(Rice Flakes|Poha)/,
          /(Broken Wheat|Daliya|Dalia)/
        ];
        
        // Check each pattern and add highlighting if found
        let formattedText = subPart;
        let matches = false;
        
        for (const pattern of milletPatterns) {
          if (pattern.test(formattedText)) {
            matches = true;
            break;
          }
        }
        
        if (matches) {
          return <Text key={`millet-${dashIndex}-${parenthIndex}`} style={styles.localNamesHighlight}>{formattedText}</Text>;
        }
        
        // Regular text
        return <React.Fragment key={`text-${dashIndex}-${parenthIndex}`}>{formattedText}</React.Fragment>;
      });
    });
  };

  return (
    <View style={styles.mealItem}>
      <Text style={styles.mealLabel}>• {label}</Text>
      <Text style={styles.mealDescription}>{formatMealDescription(description)}</Text>
      <Text style={styles.calorieInfo}>
        Calories: {getEstimatedCalories(mealType, dailyCalories, goalFactor)} kcal
      </Text>
    </View>
  );
};

export default PDFMealItem;
