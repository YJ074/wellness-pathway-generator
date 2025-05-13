
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/pdfCalorieUtils';
import { formatMealDescription } from '../utils/textFormatUtils';
import { styles } from '../styles/mealItemStyles';
import { normalizeMealForPDF } from '../../../../utils/diet/helpers/deduplication';

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
  const benefitMatch = description.match(/ - \((Contains [^)]+|[^)]+health|[^)]+sources|[^)]+protein|[^)]+enzymes|[^)]+antioxidants)\)$/);
  let healthBenefit = null;
  let mealDescription = description;
  
  if (benefitMatch && benefitMatch[0]) {
    healthBenefit = benefitMatch[1];
    mealDescription = description.replace(benefitMatch[0], '');
  }
  
  // Apply enhanced deduplication to the meal description
  // This is critical for breakfast items which tend to have more duplication
  mealDescription = normalizeMealForPDF(mealDescription);
  
  // Additional aggressive deduplication for PDF generation
  // Handle exact duplicates even if they appear with different formatting
  mealDescription = mealDescription
    // Remove duplicate items with same name but different portions or descriptions 
    .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Special handling for seeds which are prone to duplication 
    .replace(/(\b[A-Za-z]+\s+seeds)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi, '$1 (portion)')
    // Catch variations like "X and X" or "with X, X"
    .replace(/(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(?:and|with|,)\s+\1\b/gi, '$1')
    // Deduplicate common items that get repeated with connectors
    .replace(/(with|and)\s+([A-Za-z]+(?:\s+[A-Za-z]+)*),\s+\1\s+\2/gi, '$1 $2')
    // Fix double connectors
    .replace(/(with|and)\s+\1/gi, '$1')
    // Fix "with X and with X" pattern
    .replace(/with\s+([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+and\s+with\s+\1/gi, 'with $1');
  
  // Format the meal description to highlight special terms
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
