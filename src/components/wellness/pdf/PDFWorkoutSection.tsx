
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { WorkoutDay } from '@/types/workout';
import { FormData } from '../types';

const styles = StyleSheet.create({
  planSection: {
    marginBottom: 15,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 6,
    borderRadius: 3,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
    paddingLeft: 4,
    borderLeft: '2pt solid #e2e8f0',
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  restDayText: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4,
    paddingLeft: 5,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  exerciseItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  exerciseLabel: {
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  calorieInfo: {
    fontSize: 11,
    marginTop: 8,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    color: '#555',
    fontFamily: 'Roboto',
    fontWeight: 400,
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
      <Text style={styles.sectionTitle}>Workout Plan</Text>
      
      {workoutDay ? (
        workoutDay.isRestDay ? (
          <View>
            <Text style={styles.restDayText}>
              Rest Day - Focus on recovery with light stretching and mobility work. 
              Practice Shavasana (corpse pose) and deep breathing for relaxation.
            </Text>
            <Text style={styles.calorieInfo}>
              Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
            </Text>
          </View>
        ) : (
          <View>
            {/* Warm-up Section */}
            <Text style={styles.subsectionTitle}>Warm-up (5 min)</Text>
            {workoutDay.warmup.map((exercise, idx) => (
              <View key={`wu-${dayNumber}-${idx}`} style={styles.exerciseItem}>
                <Text style={styles.bulletPoint}>• {exercise}</Text>
              </View>
            ))}
            
            {/* Main Exercises Section */}
            <Text style={styles.subsectionTitle}>Main Workout (15-20 min)</Text>
            {workoutDay.exercises.map((exercise, idx) => (
              <View key={`ex-${dayNumber}-${idx}`} style={styles.exerciseItem}>
                <Text style={styles.bulletPoint}>
                  • {exercise.name} - {exercise.reps}
                  {exercise.description ? ` (${exercise.description})` : ''}
                </Text>
              </View>
            ))}
            
            {/* Cool-down Section */}
            <Text style={styles.subsectionTitle}>Cool-down (5 min)</Text>
            {workoutDay.cooldown.map((exercise, idx) => (
              <View key={`cd-${dayNumber}-${idx}`} style={styles.exerciseItem}>
                <Text style={styles.bulletPoint}>• {exercise}</Text>
              </View>
            ))}
            
            <Text style={styles.calorieInfo}>
              Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
            </Text>
          </View>
        )
      ) : (
        <Text style={styles.restDayText}>
          No workout data available for this day.
        </Text>
      )}
    </View>
  );
};

export default PDFWorkoutSection;
