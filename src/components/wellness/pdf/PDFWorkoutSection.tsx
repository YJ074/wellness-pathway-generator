
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
  getDifficultyLevel
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
  
  // Get week information based on day number
  const { weekNumber, isDeloadWeek } = getWeekInfoFromDay(validDayNumber);
  
  // Calculate estimated workout calories burned with progression
  const estimatedCaloriesBurned = getEstimatedCaloriesBurned(isRestDay, exerciseFrequency, weekNumber);
  
  // Determine fitness level based on week progression using the utility function
  const difficultyLevel = getDifficultyLevel(exerciseFrequency, weekNumber);
  
  // Determine focus area through rotation or use the one from workout day
  const focusArea = workoutDay?.focusArea || 
    getDailyFocusArea(validDayNumber, fitnessGoal);
  
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

// Helper function to determine daily focus area (moved from workoutPdfUtils to avoid circular imports)
function getDailyFocusArea(dayNumber: number, fitnessGoal: string): string {
  // Ensure dayNumber is valid
  if (!dayNumber || dayNumber < 1) return "General Fitness";
  
  const dayInWeek = dayNumber % 7;
  
  switch (dayInWeek) {
    case 1: return "Core & Stability";
    case 2: return "Mobility & Flexibility";
    case 3: return "Strength & Power";
    case 4: return "Yoga & Balance";
    case 5: return "Functional Movement";
    case 6: return fitnessGoal === 'weight-loss' ? "HIIT & Cardio" : "Endurance";
    case 0: return "Recovery & Regeneration"; // Day 7, 14, etc.
    default: return "General Fitness";
  }
}

export default PDFWorkoutSection;
