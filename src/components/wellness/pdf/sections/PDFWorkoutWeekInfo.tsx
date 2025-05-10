
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { workoutPdfStyles } from '../utils/workoutPdfStyles';

interface PDFWorkoutWeekInfoProps {
  weekNumber: number;
  isDeloadWeek: boolean;
  focusArea: string;
}

const PDFWorkoutWeekInfo = ({ weekNumber, isDeloadWeek, focusArea }: PDFWorkoutWeekInfoProps) => {
  return (
    <View>
      <Text style={workoutPdfStyles.weekInfo}>
        Week {weekNumber} {isDeloadWeek ? '(Deload Week)' : ''} - Focus: {focusArea}
      </Text>
    </View>
  );
};

export default PDFWorkoutWeekInfo;
