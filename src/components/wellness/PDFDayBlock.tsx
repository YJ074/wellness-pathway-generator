
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
// Update import path to use the consolidated deduplication module
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication';

const styles = StyleSheet.create({
  dayBlock: {
    marginBottom: 32, // Increased from 28
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 16, // Increased from 12
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 14, // Increased from 10
    color: '#334155',
    fontWeight: 'bold',
  },
  mealContainer: {
    marginBottom: 8, // Add space between meal sections
  },
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#3b3b3b',
    marginTop: 6, // Increased from 4
    marginBottom: 2, // Added space after label
  },
  mealText: {
    fontSize: 12,
    marginBottom: 4, // Increased from 2
    lineHeight: 1.5, // Increased from 1.4
  },
  footnote: {
    fontSize: 10,
    marginTop: 10, // Increased from 8
    color: '#64748b',
    fontStyle: 'italic',
  },
});

type PDFDayBlockProps = {
  day: number;
  breakfast: string;
  midMorningSnack?: string;
  lunch: string;
  eveningSnack?: string;
  dinner: string;
  snacks?: string;
  calories?: number;
  water?: number;
};

const PDFDayBlock = (dietDay: PDFDayBlockProps) => {
  // Apply our enhanced deduplication specifically for breakfast
  const processedBreakfast = normalizeMealForPDF(dietDay.breakfast);
  const processedLunch = normalizeMealForPDF(dietDay.lunch);
  const processedDinner = normalizeMealForPDF(dietDay.dinner);
  const processedMidMorningSnack = dietDay.midMorningSnack ? normalizeMealForPDF(dietDay.midMorningSnack) : undefined;
  const processedEveningSnack = dietDay.eveningSnack ? normalizeMealForPDF(dietDay.eveningSnack) : undefined;
  const processedSnacks = dietDay.snacks ? normalizeMealForPDF(dietDay.snacks) : undefined;
  
  return (
    <View style={styles.dayBlock} wrap={false}>
      <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
      
      <View style={styles.mealContainer}>
        <Text style={styles.mealLabel}>Breakfast:</Text>
        <Text style={styles.mealText}>{processedBreakfast}</Text>
      </View>

      {processedMidMorningSnack && (
        <View style={styles.mealContainer}>
          <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
          <Text style={styles.mealText}>{processedMidMorningSnack}</Text>
        </View>
      )}

      <View style={styles.mealContainer}>
        <Text style={styles.mealLabel}>Lunch:</Text>
        <Text style={styles.mealText}>{processedLunch}</Text>
      </View>

      {processedEveningSnack && (
        <View style={styles.mealContainer}>
          <Text style={styles.mealLabel}>Evening Snack:</Text>
          <Text style={styles.mealText}>{processedEveningSnack}</Text>
        </View>
      )}

      <View style={styles.mealContainer}>
        <Text style={styles.mealLabel}>Dinner:</Text>
        <Text style={styles.mealText}>{processedDinner}</Text>
      </View>

      {processedSnacks && !processedMidMorningSnack && !processedEveningSnack && (
        <View style={styles.mealContainer}>
          <Text style={styles.mealLabel}>Snacks:</Text>
          <Text style={styles.mealText}>{processedSnacks}</Text>
        </View>
      )}

      {dietDay.calories && (
        <Text style={styles.footnote}>
          Approx. Calories: {dietDay.calories} kcal • Water: {dietDay.water} L
        </Text>
      )}
    </View>
  );
};

export default PDFDayBlock;
