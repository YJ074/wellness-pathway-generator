import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { workoutPdfStyles } from '../utils/workoutPdfStyles';

interface PDFWorkoutWeekInfoProps {
  weekNumber: number;
  isDeloadWeek: boolean;
  focusArea: string | undefined;
}

const PDFWorkoutWeekInfo = ({ weekNumber, isDeloadWeek, focusArea }: PDFWorkoutWeekInfoProps) => {
  // Use ?? to handle both null and undefined
  const displayFocusArea = focusArea ?? 'General Fitness';
  
  // Keep weekNumber positive and at least 1
  const safeWeekNumber = weekNumber < 1 ? 1 : weekNumber;
  
  return (
    <View style={workoutPdfStyles.weekInfoContainer}>
      <Text style={workoutPdfStyles.weekInfo}>
        Week {safeWeekNumber} {isDeloadWeek ? '(Deload Week)' : ''} - Focus: {displayFocusArea}
      </Text>
    </View>
  );
};

export default PDFWorkoutWeekInfo;
