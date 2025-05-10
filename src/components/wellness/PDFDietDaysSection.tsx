
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import PDFDietSection from './pdf/PDFDietSection';
import PDFWorkoutSection from './pdf/PDFWorkoutSection';

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 10,
  },
  daySection: {
    marginBottom: 30,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    fontFamily: 'Helvetica-Bold',
  }
});

interface PDFDietDaysSectionProps {
  dietPlan: DietPlan;
  formData: FormData;
  workoutPlan?: WorkoutPlan;
}

const PDFDietDaysSection = ({ dietPlan, formData, workoutPlan }: PDFDietDaysSectionProps) => {
  return (
    <View style={styles.container}>
      {dietPlan.days.slice(0, 5).map((day) => {
        // Find matching workout day
        const workoutDay = workoutPlan?.days.find(w => w.day === day.day);
        
        return (
          <View key={`day-${day.day}`} style={styles.daySection}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            
            {/* Diet Plan Section */}
            <PDFDietSection day={day} formData={formData} />
            
            {/* Workout Plan Section */}
            <PDFWorkoutSection 
              workoutDay={workoutDay} 
              formData={formData} 
              dayNumber={day.day} 
            />
          </View>
        );
      })}
    </View>
  );
};

export default PDFDietDaysSection;
