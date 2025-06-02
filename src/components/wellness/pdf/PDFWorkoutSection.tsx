
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { WorkoutDay } from '@/types/workout';
import { FormData } from '../types';
import { workoutPdfStyles } from './utils/workoutPdfStyles';
import PDFWorkoutHeader from './sections/PDFWorkoutHeader';
import PDFWorkoutWeekInfo from './sections/PDFWorkoutWeekInfo';
import PDFRestDayContent from './sections/PDFRestDayContent';
import PDFWorkoutContent from './sections/PDFWorkoutContent';
import { 
  getWeekInfoFromDay,
  isRecoveryDay,
  getEstimatedCaloriesBurned,
  getDifficultyLevel,
  getDailyFocusArea
} from './utils/workoutPdfUtils';

interface PDFWorkoutSectionProps {
  workoutDay?: WorkoutDay;
  formData: FormData;
  dayNumber: number;
}

const PDFWorkoutSection = ({ workoutDay, formData, dayNumber }: PDFWorkoutSectionProps) => {
  // Ensure the dayNumber is a valid number
  const validDayNumber = dayNumber > 0 ? dayNumber : 1;
  
  // Determine if it's a rest day
  const isRestDay = workoutDay?.isRestDay ?? false;
  
  // Get exercise frequency with fallback
  const exerciseFrequency = formData.exerciseFrequency || 'sedentary';
  const fitnessGoal = formData.fitnessGoal || 'maintenance';
  const gender = formData.gender; // Get gender from form data
  const age = formData.age; // Get age from form data
  
  // Get week information based on day number
  const { weekNumber, isDeloadWeek } = getWeekInfoFromDay(validDayNumber);
  
  // Calculate estimated workout calories burned with progression, gender, and age
  const estimatedCaloriesBurned = getEstimatedCaloriesBurned(isRestDay, exerciseFrequency, weekNumber, gender, age);
  
  // Determine fitness level based on week progression using the utility function
  const difficultyLevel = getDifficultyLevel(exerciseFrequency, weekNumber);
  
  // Determine focus area with gender consideration
  const focusArea = workoutDay?.focusArea || 
    getDailyFocusArea(validDayNumber, fitnessGoal, gender);
  
  // Check if it's a recovery day
  const isRecoveryDayFlag = isRecoveryDay(validDayNumber);
  
  return (
    <View style={workoutPdfStyles.planSection}>
      <PDFWorkoutHeader difficultyLevel={difficultyLevel} />
      
      {/* Week and progression information */}
      <PDFWorkoutWeekInfo 
        weekNumber={weekNumber} 
        isDeloadWeek={isDeloadWeek} 
        focusArea={focusArea} 
      />
      
      {workoutDay ? (
        workoutDay.isRestDay ? (
          <PDFRestDayContent 
            isRecoveryDay={isRecoveryDayFlag} 
            estimatedCaloriesBurned={estimatedCaloriesBurned} 
          />
        ) : (
          <PDFWorkoutContent 
            workoutDay={workoutDay} 
            estimatedCaloriesBurned={estimatedCaloriesBurned} 
          />
        )
      ) : (
        <Text style={workoutPdfStyles.restDayText}>
          No workout data available for this day.
        </Text>
      )}
    </View>
  );
};

export default PDFWorkoutSection;
