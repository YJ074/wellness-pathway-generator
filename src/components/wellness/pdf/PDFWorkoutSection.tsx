
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { WorkoutDay } from '@/types/workout';
import { FormData } from '../types';
import { workoutPdfStyles } from './utils/workoutPdfStyles';
import PDFWorkoutHeader from './sections/PDFWorkoutHeader';
import PDFWorkoutWeekInfo from './sections/PDFWorkoutWeekInfo';
import PDFRestDayContent from './sections/PDFRestDayContent';
import PDFWorkoutContent from './sections/PDFWorkoutContent';

interface PDFWorkoutSectionProps {
  workoutDay?: WorkoutDay;
  formData: FormData;
  dayNumber: number;
}

const PDFWorkoutSection = ({ workoutDay, formData, dayNumber }: PDFWorkoutSectionProps) => {
  // Calculate estimated workout calories burned
  const isRestDay = workoutDay?.isRestDay || false;
  const isRecoveryDay = dayNumber % 7 === 0; // Every 7th day is a recovery day
  
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
  
  // Determine focus area through rotation
  const getDailyFocusArea = () => {
    const dayInWeek = dayNumber % 7;
    
    switch (dayInWeek) {
      case 1: return "Core & Stability";
      case 2: return "Mobility & Flexibility";
      case 3: return "Strength & Power";
      case 4: return "Yoga & Balance";
      case 5: return "Functional Movement";
      case 6: return formData.fitnessGoal === 'weight-loss' ? "HIIT & Cardio" : "Endurance";
      case 0: return "Recovery & Regeneration"; // Day 7, 14, etc.
      default: return "General Fitness";
    }
  };
  
  // Check if it's a deload week (every 4th week)
  const isDeloadWeek = (weekNumber % 4 === 0);
  const focusArea = workoutDay?.focusArea || getDailyFocusArea();
  
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
            isRecoveryDay={isRecoveryDay} 
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
