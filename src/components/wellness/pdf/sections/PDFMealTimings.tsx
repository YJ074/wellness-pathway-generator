
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#f8fafc'
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  timingsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timingItem: {
    width: '50%',
    marginBottom: 4,
    flexDirection: 'row',
  },
  mealLabel: {
    fontSize: 8,
    color: '#475569',
    width: '40%',
  },
  timeText: {
    fontSize: 8,
    color: '#0f172a',
  },
  note: {
    fontSize: 8,
    marginTop: 4,
    color: '#64748b',
    fontStyle: 'italic',
  },
  cheatMealNote: {
    fontSize: 8,
    marginTop: 4,
    padding: 4,
    backgroundColor: '#fff9db',
    color: '#92400e',
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
  cheatMealInfo?: string | null;
  timingTips?: string;
}

const PDFMealTimings = ({ mealTimings, cheatMealInfo, timingTips }: PDFMealTimingsProps) => {
  if (!mealTimings) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Meal Timings</Text>
      
      <View style={styles.timingsGrid}>
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Breakfast:</Text>
          <Text style={styles.timeText}>{mealTimings.breakfast}</Text>
        </View>
        
        <View style={styles.timingItem}>
          <Text style={styles.mealLabel}>Mid-Morning:</Text>
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
        <Text style={styles.note}>Tip: {timingTips}</Text>
      )}
      
      {cheatMealInfo && (
        <Text style={styles.cheatMealNote}>{cheatMealInfo}</Text>
      )}
    </View>
  );
};

export default PDFMealTimings;
