
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
  getDifficultyLevel, 
  getDailyFocusArea, 
  getEstimatedCaloriesBurned,
  getWeekInfoFromDay,
  isRecoveryDay
} from './utils/workoutPdfUtils';

interface PDFWorkoutSectionProps {
  workoutDay?: WorkoutDay;
  formData: FormData;
  dayNumber: number;
}

const PDFWorkoutSection = ({ workoutDay, formData, dayNumber }: PDFWorkoutSectionProps) => {
  // Determine if it's a rest day
  const isRestDay = workoutDay?.isRestDay || false;
  
  // Calculate estimated workout calories burned
  const estimatedCaloriesBurned = getEstimatedCaloriesBurned(
    isRestDay, 
    formData.exerciseFrequency || 'sedentary'
  );
  
  // Determine fitness level based on exercise frequency
  const difficultyLevel = getDifficultyLevel(formData.exerciseFrequency || 'sedentary');
  
  // Get week information based on day number
  const { weekNumber, isDeloadWeek } = getWeekInfoFromDay(dayNumber);
  
  // Determine focus area through rotation or use the one from workout day
  const focusArea = workoutDay?.focusArea || 
    getDailyFocusArea(dayNumber, formData.fitnessGoal || 'maintenance');
  
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
            isRecoveryDay={isRecoveryDay(dayNumber)} 
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
