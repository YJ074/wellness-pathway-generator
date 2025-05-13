
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
  // This is where the duplication bug was - we need to ensure more aggressive deduplication
  mealDescription = normalizeMealForPDF(mealDescription);
  
  // Additional deduplication for exact duplicate items with different portions
  // This catches cases like "sunflower seeds (1 tsp), sunflower seeds (1 tsp handful)"
  const duplicatePattern = /(\b[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi;
  mealDescription = mealDescription.replace(duplicatePattern, '$1 (portion)');
  
  // Special case for seeds which commonly get duplicated
  const seedsDuplicationPattern = /(\b[A-Za-z]+\s+seeds)\s+\([^)]+\)(?:[^,]*),(?:[^,]*)\1\s+\([^)]+\)/gi;
  mealDescription = mealDescription.replace(seedsDuplicationPattern, '$1 (portion)');
  
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
