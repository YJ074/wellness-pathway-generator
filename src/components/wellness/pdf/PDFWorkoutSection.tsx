
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 6,
    borderRadius: 3,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  subsectionTitle: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 6,
    paddingLeft: 4,
    borderLeft: '2pt solid #e2e8f0',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  restDayText: {
    fontSize: 11,
    marginBottom: 8,
    lineHeight: 1.4,
    paddingLeft: 5,
    fontFamily: 'Helvetica',
  },
  exerciseItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  exerciseLabel: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  calorieInfo: {
    fontSize: 11,
    marginTop: 8,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    color: '#555',
    fontFamily: 'Helvetica',
  },
  difficultyLabel: {
    fontSize: 9,
    marginLeft: 5,
    padding: '2 5',
    borderRadius: 3,
    color: 'white',
    fontFamily: 'Helvetica',
  },
  beginnerLabel: {
    backgroundColor: '#22c55e', // green
  },
  intermediateLabel: {
    backgroundColor: '#f59e0b', // amber
  },
  advancedLabel: {
    backgroundColor: '#ef4444', // red
  },
  goalTag: {
    fontSize: 9,
    marginTop: 3,
    marginLeft: 10,
    padding: '1 4',
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
    color: '#334155',
    fontFamily: 'Helvetica',
  },
  weekInfo: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 10,
    color: '#64748b',
    fontStyle: 'italic',
    fontFamily: 'Helvetica',
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
  
  // Determine fitness level based on exercise frequency
  const getDifficultyLevel = () => {
    if (formData.exerciseFrequency === '5+') return 'Advanced';
    if (formData.exerciseFrequency === '3-4') return 'Intermediate';
    return 'Beginner';
  };
  
  const difficultyLevel = getDifficultyLevel();
  
  // Calculate week number (1-indexed)
  const weekNumber = Math.floor((dayNumber - 1) / 7) + 1;
  
  // Determine workout goal focus based on fitness goal and week pattern
  const getWorkoutGoalFocus = () => {
    // Each week emphasizes different fitness aspects in a cycle
    const weekRotation = weekNumber % 3;
    
    if (formData.fitnessGoal === 'weight-loss') {
      if (weekRotation === 0) return 'Endurance';
      if (weekRotation === 1) return 'HIIT';
      return 'Strength';
    }
    
    if (formData.fitnessGoal === 'muscle-gain') {
      if (weekRotation === 0) return 'Strength';
      if (weekRotation === 1) return 'Hypertrophy';
      return 'Recovery';
    }
    
    // Default/maintenance goal
    if (weekRotation === 0) return 'Flexibility';
    if (weekRotation === 1) return 'Strength';
    return 'Balance';
  };

  const workoutGoal = getWorkoutGoalFocus();
  
  // Check if it's a deload week (every 4th week)
  const isDeloadWeek = (weekNumber % 4 === 0);
  
  return (
    <View style={styles.planSection}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.sectionTitle}>Workout Plan</Text>
        
        <View style={[
          styles.difficultyLabel, 
          difficultyLevel === 'Beginner' ? styles.beginnerLabel : 
          difficultyLevel === 'Intermediate' ? styles.intermediateLabel : 
          styles.advancedLabel
        ]}>
          <Text>{difficultyLevel}</Text>
        </View>
      </View>
      
      {/* Week and progression information */}
      <View>
        <Text style={styles.weekInfo}>
          Week {weekNumber} {isDeloadWeek ? '(Deload Week)' : `- Focus: ${workoutGoal}`}
        </Text>
      </View>
      
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
            
            {/* Main Exercises Section with Goal Tag */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.subsectionTitle}>Main Workout (15-20 min)</Text>
              <View style={styles.goalTag}>
                <Text>{workoutGoal}</Text>
              </View>
            </View>
            
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
