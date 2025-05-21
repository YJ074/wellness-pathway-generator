
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headerContainer: {
    backgroundColor: '#f1f5f9',
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155',
  },
  timingsContainer: {
    marginBottom: 6,
  },
  timingRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  mealLabel: {
    fontSize: 10,
    width: '30%',
    fontWeight: 'bold',
  },
  mealTime: {
    fontSize: 10,
    width: '70%',
  },
  tipContainer: {
    backgroundColor: '#dbeafe',
    padding: 6,
    borderRadius: 4,
    marginVertical: 6,
  },
  tipText: {
    fontSize: 9,
    color: '#1e40af',
  },
  cheatMealContainer: {
    backgroundColor: '#fff7ed',
    padding: 6,
    borderRadius: 4,
    marginTop: 6,
  },
  cheatMealText: {
    fontSize: 9,
    color: '#9a3412',
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recommended Meal Timings</Text>
      </View>
      
      <View style={styles.timingsContainer}>
        <View style={styles.timingRow}>
          <Text style={styles.mealLabel}>Breakfast:</Text>
          <Text style={styles.mealTime}>{mealTimings.breakfast}</Text>
        </View>
        
        <View style={styles.timingRow}>
          <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
          <Text style={styles.mealTime}>{mealTimings.midMorningSnack}</Text>
        </View>
        
        <View style={styles.timingRow}>
          <Text style={styles.mealLabel}>Lunch:</Text>
          <Text style={styles.mealTime}>{mealTimings.lunch}</Text>
        </View>
        
        <View style={styles.timingRow}>
          <Text style={styles.mealLabel}>Evening Snack:</Text>
          <Text style={styles.mealTime}>{mealTimings.eveningSnack}</Text>
        </View>
        
        <View style={styles.timingRow}>
          <Text style={styles.mealLabel}>Dinner:</Text>
          <Text style={styles.mealTime}>{mealTimings.dinner}</Text>
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
