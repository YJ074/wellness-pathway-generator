
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/pdfCalorieUtils';
import { formatMealDescription } from '../utils/textFormatUtils';
import { styles } from '../styles/mealItemStyles';

interface PDFMealItemProps {
  label: string;
  description: string;
  mealType: string;
  dailyCalories: number;
  goalFactor: number;
}

// Helper function to normalize whitespace in text
const normalizeWhitespace = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
    .replace(/\s+,/g, ',') // Remove spaces before commas
    .replace(/,\s+/g, ', ') // Ensure exactly one space after commas
    .replace(/\s+\(/g, ' (') // Ensure only one space before parentheses
    .replace(/\)\s+/g, ') ') // Ensure only one space after parentheses
    .trim();
};

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor 
}: PDFMealItemProps) => {
  // Extract health benefit if present in the description
  const benefitMatch = description.match(/ - \((Contains [^)]+|[^)]+health|[^)]+sources|[^)]+protein)\)$/);
  let healthBenefit = null;
  let mealDescription = description;
  
  if (benefitMatch && benefitMatch[0]) {
    healthBenefit = benefitMatch[1];
    mealDescription = description.replace(benefitMatch[0], '');
  }
  
  // Normalize whitespace before formatting
  mealDescription = normalizeWhitespace(mealDescription);
  
  // Format the meal description to highlight special terms and deduplicate repeated portions
  const formattedDescription = formatMealDescription(mealDescription);
  
  return (
    <View style={styles.mealItem} wrap={false}>
      <Text style={styles.mealLabel}>• {label}</Text>
      
      <View style={styles.descriptionContainer}>
        {formattedDescription.map((segment, index) => {
          if (typeof segment === 'string') {
            return <Text key={`text-${index}`} style={styles.mealDescription}>{segment}</Text>;
          }
          return React.cloneElement(segment as React.ReactElement, { key: `segment-${index}` });
        })}
      </View>
      
      {healthBenefit && (
        <View style={styles.healthBenefitContainer}>
          <Text style={styles.healthBenefit}>
            ♥ {healthBenefit}
          </Text>
        </View>
      )}
      
      <Text style={styles.calorieInfo}>
        Calories: {getEstimatedCalories(mealType, dailyCalories, goalFactor)} kcal
      </Text>
    </View>
  );
};

export default PDFMealItem;
