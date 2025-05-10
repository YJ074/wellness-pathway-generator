
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { WorkoutDay } from '@/types/workout';
import { workoutPdfStyles } from '../utils/workoutPdfStyles';

interface PDFWorkoutContentProps {
  workoutDay: WorkoutDay;
  estimatedCaloriesBurned: number;
}

const PDFWorkoutContent = ({ workoutDay, estimatedCaloriesBurned }: PDFWorkoutContentProps) => {
  // Determine if the workout has progression information
  const progressionInfo = workoutDay.progression || '';
  
  return (
    <View>
      {/* Show progression information if available */}
      {progressionInfo && (
        <Text style={workoutPdfStyles.progressionInfo}>
          {progressionInfo}
        </Text>
      )}
      
      {/* Warm-up Section */}
      <Text style={workoutPdfStyles.subsectionTitle}>Warm-up (5 min)</Text>
      {workoutDay.warmup.map((exercise, idx) => (
        <View key={`wu-${workoutDay.day}-${idx}`} style={workoutPdfStyles.exerciseItem}>
          <Text style={workoutPdfStyles.bulletPoint}>• {exercise}</Text>
        </View>
      ))}
      
      {/* Main Exercises Section with Goal Tag */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={workoutPdfStyles.subsectionTitle}>Main Workout (15-20 min)</Text>
        <View style={workoutPdfStyles.goalTag}>
          <Text>{workoutDay.focusArea}</Text>
        </View>
      </View>
      
      {workoutDay.exercises.map((exercise, idx) => (
        <View key={`ex-${workoutDay.day}-${idx}`} style={workoutPdfStyles.exerciseItem}>
          <Text style={workoutPdfStyles.bulletPoint}>
            • {exercise.name} - {exercise.reps}
            {exercise.description ? ` (${exercise.description})` : ''}
          </Text>
        </View>
      ))}
      
      {/* Cool-down Section */}
      <Text style={workoutPdfStyles.subsectionTitle}>Cool-down (5 min)</Text>
      {workoutDay.cooldown.map((exercise, idx) => (
        <View key={`cd-${workoutDay.day}-${idx}`} style={workoutPdfStyles.exerciseItem}>
          <Text style={workoutPdfStyles.bulletPoint}>• {exercise}</Text>
        </View>
      ))}
      
      <Text style={workoutPdfStyles.calorieInfo}>
        Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
        {workoutDay.day > 14 ? " (includes progressive intensity)" : ""}
      </Text>
    </View>
  );
};

export default PDFWorkoutContent;
