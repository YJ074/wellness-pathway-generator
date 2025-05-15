
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { getEstimatedCalories } from '../../utils/mealCalories';
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication';

// Improved styles with better alignment and spacing
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  caloriesContainer: {
    position: 'absolute',
    right: 60, // Offset to allow space for time display
    top: 0,
  },
  calories: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'right',
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
    textAlign: 'right',
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
  // Apply triple-pass deduplication for maximum effectiveness
  const processedDescription = applyDeduplication 
    ? normalizeMealForPDF(normalizeMealForPDF(normalizeMealForPDF(description)))
    : description;
  
  // Calculate estimated calories for this meal
  const mealCalories = getEstimatedCalories(
    mealType as any, 
    dailyCalories, 
    goalFactor
  );
  
  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        
        {/* Calories display with fixed position */}
        <View style={styles.caloriesContainer}>
          <Text style={styles.calories}>~{mealCalories} kcal</Text>
        </View>
        
        {/* Time display with fixed position */}
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
