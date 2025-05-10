
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
  isRecoveryDay
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
  
  // Calculate estimated workout calories burned with progression
  // Start with base calories and increase by 5% every 2 weeks (up to 50% more)
  const baseCalories = isRestDay ? 100 : 
                    (exerciseFrequency === '5+' ? 350 :
                    exerciseFrequency === '3-4' ? 280 : 200);
                    
  const weekNumber = Math.floor((validDayNumber - 1) / 7) + 1;
  const calorieProgressionFactor = Math.min(1 + (Math.floor(weekNumber / 2) * 0.05), 1.5);
  const estimatedCaloriesBurned = Math.round(baseCalories * calorieProgressionFactor);
  
  // Determine fitness level based on week progression
  let difficultyLevel = 'Beginner';
  
  // Progress difficulty level based on weeks completed
  if (exerciseFrequency === '5+' || (exerciseFrequency === '3-4' && weekNumber > 4)) {
    difficultyLevel = 'Advanced';
  } else if (exerciseFrequency === '3-4' || (exerciseFrequency === '1-2' && weekNumber > 6)) {
    difficultyLevel = 'Intermediate';
  } else if (weekNumber > 8) {
    // Even beginners progress after 8 weeks
    difficultyLevel = 'Intermediate';
  }
  
  // Get week information based on day number
  const { weekNumber: displayWeekNumber, isDeloadWeek } = getWeekInfoFromDay(validDayNumber);
  
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
        weekNumber={displayWeekNumber} 
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
