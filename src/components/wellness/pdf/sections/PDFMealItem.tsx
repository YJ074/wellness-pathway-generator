
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

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor 
}: PDFMealItemProps) => {
  // Extract health benefit if present in the description
  const benefitMatch = description.match(/ - \((.*?)\)$/);
  let healthBenefit = null;
  let mealDescription = description;
  
  if (benefitMatch && benefitMatch[1]) {
    healthBenefit = benefitMatch[1];
    mealDescription = description.replace(benefitMatch[0], '');
  }
  
  return (
    <View style={styles.mealItem}>
      <Text style={styles.mealLabel}>• {label}</Text>
      <Text style={styles.mealDescription}>{formatMealDescription(mealDescription)}</Text>
      
      {healthBenefit && (
        <Text style={styles.healthBenefit}>
          ♥ {healthBenefit}
        </Text>
      )}
      
      <Text style={styles.calorieInfo}>
        Calories: {getEstimatedCalories(mealType, dailyCalories, goalFactor)} kcal
      </Text>
    </View>
  );
};

export default PDFMealItem;
