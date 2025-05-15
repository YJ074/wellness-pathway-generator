
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
// Update import path to use the consolidated deduplication module
import { normalizeMealForPDF } from '@/utils/diet/helpers/deduplication';

const styles = StyleSheet.create({
  dayBlock: {
    marginBottom: 32,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 16,
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 14,
    color: '#334155',
    fontWeight: 'bold',
  },
  mealContainer: {
    marginBottom: 10, // Increased from 8 for better spacing
    position: 'relative', // Added for absolute positioning of time/calories
  },
  mealLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#3b3b3b',
  },
  mealTime: {
    fontSize: 10,
    color: '#3b82f6',
    textAlign: 'right',
  },
  mealText: {
    fontSize: 12,
    marginBottom: 6, // Increased from 4
    lineHeight: 1.5,
  },
  footnote: {
    fontSize: 10,
    marginTop: 10,
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
  mealTimings?: {
    breakfast: string;
    midMorningSnack: string;
    lunch: string;
    eveningSnack: string;
    dinner: string;
  };
};

const PDFDayBlock = (dietDay: PDFDayBlockProps) => {
  // Apply our enhanced deduplication with double-pass processing for breakfast
  const processedBreakfast = normalizeMealForPDF(normalizeMealForPDF(dietDay.breakfast));
  const processedLunch = normalizeMealForPDF(normalizeMealForPDF(dietDay.lunch));
  const processedDinner = normalizeMealForPDF(normalizeMealForPDF(dietDay.dinner));
  const processedMidMorningSnack = dietDay.midMorningSnack ? normalizeMealForPDF(dietDay.midMorningSnack) : undefined;
  const processedEveningSnack = dietDay.eveningSnack ? normalizeMealForPDF(dietDay.eveningSnack) : undefined;
  const processedSnacks = dietDay.snacks ? normalizeMealForPDF(dietDay.snacks) : undefined;
  
  // Extract meal timings
  const { mealTimings } = dietDay;
  
  return (
    <View style={styles.dayBlock} wrap={false}>
      <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
      
      <View style={styles.mealContainer}>
        <View style={styles.mealLabelRow}>
          <Text style={styles.mealLabel}>Breakfast:</Text>
          {mealTimings && <Text style={styles.mealTime}>{mealTimings.breakfast}</Text>}
        </View>
        <Text style={styles.mealText}>{processedBreakfast}</Text>
      </View>

      {processedMidMorningSnack && (
        <View style={styles.mealContainer}>
          <View style={styles.mealLabelRow}>
            <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
            {mealTimings && <Text style={styles.mealTime}>{mealTimings.midMorningSnack}</Text>}
          </View>
          <Text style={styles.mealText}>{processedMidMorningSnack}</Text>
        </View>
      )}

      <View style={styles.mealContainer}>
        <View style={styles.mealLabelRow}>
          <Text style={styles.mealLabel}>Lunch:</Text>
          {mealTimings && <Text style={styles.mealTime}>{mealTimings.lunch}</Text>}
        </View>
        <Text style={styles.mealText}>{processedLunch}</Text>
      </View>

      {processedEveningSnack && (
        <View style={styles.mealContainer}>
          <View style={styles.mealLabelRow}>
            <Text style={styles.mealLabel}>Evening Snack:</Text>
            {mealTimings && <Text style={styles.mealTime}>{mealTimings.eveningSnack}</Text>}
          </View>
          <Text style={styles.mealText}>{processedEveningSnack}</Text>
        </View>
      )}

      <View style={styles.mealContainer}>
        <View style={styles.mealLabelRow}>
          <Text style={styles.mealLabel}>Dinner:</Text>
          {mealTimings && <Text style={styles.mealTime}>{mealTimings.dinner}</Text>}
        </View>
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
