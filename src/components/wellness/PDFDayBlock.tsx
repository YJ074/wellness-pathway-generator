
import React from 'react';
import { View, Text } from '@react-pdf/renderer';

const styles = {
  dayBlock: {
    marginBottom: 28,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 12,
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#334155',
    fontWeight: 'bold' as const,
  },
  mealLabel: {
    fontWeight: 'bold' as const,
    fontSize: 12,
    color: '#3b3b3b',
    marginTop: 4,
  },
  mealText: {
    fontSize: 12,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  footnote: {
    fontSize: 10,
    marginTop: 8,
    color: '#64748b',
    fontStyle: 'italic' as const,
  },
};

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

const PDFDayBlock = (dietDay: PDFDayBlockProps) => (
  <View style={styles.dayBlock}>
    <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
    <View>
      <Text style={styles.mealLabel}>Breakfast:</Text>
      <Text style={styles.mealText}>{dietDay.breakfast}</Text>

      {dietDay.midMorningSnack && (
        <>
          <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
          <Text style={styles.mealText}>{dietDay.midMorningSnack}</Text>
        </>
      )}

      <Text style={styles.mealLabel}>Lunch:</Text>
      <Text style={styles.mealText}>{dietDay.lunch}</Text>

      {dietDay.eveningSnack && (
        <>
          <Text style={styles.mealLabel}>Evening Snack:</Text>
          <Text style={styles.mealText}>{dietDay.eveningSnack}</Text>
        </>
      )}

      <Text style={styles.mealLabel}>Dinner:</Text>
      <Text style={styles.mealText}>{dietDay.dinner}</Text>

      {dietDay.snacks && !dietDay.midMorningSnack && !dietDay.eveningSnack && (
        <>
          <Text style={styles.mealLabel}>Snacks:</Text>
          <Text style={styles.mealText}>{dietDay.snacks}</Text>
        </>
      )}

      {dietDay.calories && (
        <Text style={styles.footnote}>
          Approx. Calories: {dietDay.calories} kcal • Water: {dietDay.water} L
        </Text>
      )}
    </View>
  </View>
);

export default PDFDayBlock;
