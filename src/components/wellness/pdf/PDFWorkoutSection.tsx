
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { WorkoutDay } from '@/types/workout';
import { FormData } from '../types';

const styles = StyleSheet.create({
  planSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
    backgroundColor: '#f9f9f9',
    padding: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  exerciseLabel: {
    fontWeight: 'bold',
  },
  nutritionText: {
    fontSize: 9,
    marginBottom: 2,
  },
  exerciseItem: {
    marginBottom: 5,
  }
});

interface PDFWorkoutSectionProps {
  workoutDay?: WorkoutDay;
  formData: FormData;
  dayNumber: number;
}

const PDFWorkoutSection = ({ workoutDay, formData, dayNumber }: PDFWorkoutSectionProps) => {
  // Calculate estimated workout calories burned
  const isRestDay = workoutDay?.isRestDay || false;
  const estimatedCaloriesBurned = isRestDay ? 100 : 
                                formData.exerciseFrequency === '5+' ? 350 :
                                formData.exerciseFrequency === '3-4' ? 280 : 200;
  
  return (
    <View style={styles.planSection}>
      <Text style={styles.sectionTitle}>💪 Workout Plan:</Text>
      
      {workoutDay ? (
        workoutDay.isRestDay ? (
          <Text style={styles.text}>
            Rest Day - Focus on recovery with light stretching and mobility work. 
            Practice Shavasana (corpse pose) and deep breathing for relaxation.
          </Text>
        ) : (
          <View>
            <Text style={styles.text}>
              <Text style={styles.exerciseLabel}>Warm-up (5 min): </Text>
              {workoutDay.warmup.join(', ')}
            </Text>
            
            <Text style={styles.exerciseLabel}>Main Exercises (15-20 min):</Text>
            {workoutDay.exercises.map((exercise, idx) => (
              <View key={`ex-${dayNumber}-${idx}`} style={styles.exerciseItem}>
                <Text style={styles.text}>
                  • {exercise.name} - {exercise.reps}
                  {exercise.description ? ` (${exercise.description})` : ''}
                </Text>
              </View>
            ))}
            
            <Text style={styles.text}>
              <Text style={styles.exerciseLabel}>Cool-down (5 min): </Text>
              {workoutDay.cooldown.join(', ')}
            </Text>
            
            <Text style={styles.nutritionText}>
              🔥 Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
            </Text>
          </View>
        )
      ) : (
        <Text style={styles.text}>
          No workout data available for this day.
        </Text>
      )}
    </View>
  );
};

export default PDFWorkoutSection;
