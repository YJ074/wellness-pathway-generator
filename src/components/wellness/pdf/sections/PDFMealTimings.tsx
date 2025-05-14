
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Clock, AlertCircle } from '@react-pdf/renderer/lib/react-pdf-lucide-icons';

// Create styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  header: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    color: '#334155',
  },
  timingsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timingItem: {
    width: '50%',
    marginBottom: 4,
  },
  mealLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#475569',
  },
  timeText: {
    fontSize: 8,
    color: '#1e293b',
  },
  tipContainer: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  tipText: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#334155',
  },
  cheatMealContainer: {
    marginTop: 6,
    padding: 5,
    backgroundColor: '#fef3c7', // Light amber color
    borderRadius: 3,
  },
  cheatMealText: {
    fontSize: 8,
    color: '#92400e', // Amber text
  }
});

interface PDFMealTimingsProps {
  mealTimings?: {
    breakfast: string;
    midMorningSnack: string;
    lunch: string;
    eveningSnack: string;
    dinner: string;
  };
  timingTips?: string;
  cheatMealInfo?: string | null;
}

const PDFMealTimings = ({ mealTimings, timingTips, cheatMealInfo }: PDFMealTimingsProps) => {
  if (!mealTimings) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Meal Timings</Text>
      
      <View style={styles.timingsGrid}>
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Breakfast:</Text>
          <Text style={styles.timeText}>{mealTimings.breakfast}</Text>
        </View>
        
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
          <Text style={styles.timeText}>{mealTimings.midMorningSnack}</Text>
        </View>
        
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Lunch:</Text>
          <Text style={styles.timeText}>{mealTimings.lunch}</Text>
        </View>
        
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Evening Snack:</Text>
          <Text style={styles.timeText}>{mealTimings.eveningSnack}</Text>
        </View>
        
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Dinner:</Text>
          <Text style={styles.timeText}>{mealTimings.dinner}</Text>
        </View>
      </View>
      
      {timingTips && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>Tip: {timingTips}</Text>
        </View>
      )}
      
      {cheatMealInfo && (
        <View style={styles.cheatMealContainer}>
          <Text style={styles.cheatMealText}>{cheatMealInfo}</Text>
        </View>
      )}
    </View>
  );
};

export default PDFMealTimings;
