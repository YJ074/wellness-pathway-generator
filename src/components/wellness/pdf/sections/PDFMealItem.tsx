
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
  // Function to highlight local names in parentheses
  const formatMealDescription = (text: string) => {
    // Split by parts that may contain local names in parentheses
    const parts = text.split(/(\([^)]+\))/g);
    
    return parts.map((part, index) => {
      // If this part is a parenthetical expression (likely a local name)
      if (part.startsWith('(') && part.endsWith(')')) {
        return <Text key={index} style={styles.localNamesHighlight}>{part}</Text>;
      }
      // Regular text
      return <React.Fragment key={index}>{part}</React.Fragment>;
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
