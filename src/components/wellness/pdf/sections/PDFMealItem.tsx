
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/mealCalories';
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication/mealNormalization';

// These are imported from mealItemStyles.tsx
// Just using inline styles here for clarity
const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  calories: {
    fontSize: 8,
    color: '#64748b',
  },
  mealText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  timeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  timeText: {
    fontSize: 8,
    color: '#3b82f6',
    fontFamily: 'Helvetica-Bold',
  }
});

interface PDFMealItemProps {
  label: string;
  description: string;
  mealType: string;
  dailyCalories: number;
  goalFactor?: number;
  applyDeduplication?: boolean;
  suggestedTime?: string;
}

const PDFMealItem = ({ 
  label, 
  description, 
  mealType, 
  dailyCalories, 
  goalFactor = 1,
  applyDeduplication = true,
  suggestedTime
}: PDFMealItemProps) => {
  // Apply our enhanced deduplication with double-pass processing for better results
  const processedDescription = applyDeduplication 
    ? normalizeMealForPDF(normalizeMealForPDF(description))
    : description;
  
  // Calculate estimated calories for this meal
  const mealCalories = getEstimatedCalories(mealType, dailyCalories);
  
  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        <View>
          <Text style={styles.calories}>~{mealCalories} kcal</Text>
        </View>
        
        {suggestedTime && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{suggestedTime}</Text>
          </View>
        )}
      </View>
      <Text style={styles.mealText}>{processedDescription}</Text>
    </View>
  );
};

export default PDFMealItem;
