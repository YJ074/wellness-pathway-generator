
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/pdfCalorieUtils';
import { formatMealDescription } from '../utils/textFormatUtils';
import { styles } from '../styles/mealItemStyles';
// Use the direct import path from the deduplication module
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication';

interface PDFMealItemProps {
  label: string;
  description: string;
  mealType: string;
  dailyCalories: number;
  goalFactor: number;
  applyDeduplication?: boolean; 
}

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor,
  applyDeduplication = true 
}: PDFMealItemProps) => {
  // Extract health benefit if present in the description
  const benefitMatch = description.match(/ - \((Contains [^)]+|[^)]+health|[^)]+sources|[^)]+protein|[^)]+enzymes|[^)]+antioxidants)\)$/);
  const healthBenefit = benefitMatch ? benefitMatch[0] : '';
  
  // Remove health benefit from description for processing
  const descriptionWithoutBenefit = description.replace(healthBenefit, '');
  
  // Perform a double-pass deduplication for maximum effectiveness
  // First pass: Basic deduplication with our core algorithm
  const firstPassDeduplication = applyDeduplication 
    ? normalizeMealForPDF(descriptionWithoutBenefit) 
    : descriptionWithoutBenefit;
    
  // Second pass: More aggressive deduplication for stubborn cases
  const processedDescription = applyDeduplication 
    ? normalizeMealForPDF(firstPassDeduplication) 
    : firstPassDeduplication;
  
  // Reattach health benefit if it was present
  const finalDescription = healthBenefit 
    ? `${processedDescription}${healthBenefit}` 
    : processedDescription;
  
  // Calculate estimated calories for this meal
  const caloriesForMeal = getEstimatedCalories(mealType, dailyCalories, goalFactor);
  
  return (
    <View style={styles.mealSection}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealLabel}>{label}</Text>
        <Text style={styles.calorieInfo}>~{caloriesForMeal} cal</Text>
      </View>
      <View style={styles.mealContent}>
        {formatMealDescription(finalDescription).map((item, index) => {
          if (typeof item === 'string') {
            return <Text key={`text-${index}`} style={styles.mealDescription}>{item}</Text>;
          }
          return item;
        })}
      </View>
    </View>
  );
};

export default PDFMealItem;
