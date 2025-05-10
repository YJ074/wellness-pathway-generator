
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { workoutPdfStyles } from '../utils/workoutPdfStyles';

interface PDFWorkoutHeaderProps {
  difficultyLevel: string;
}

const PDFWorkoutHeader = ({ difficultyLevel }: PDFWorkoutHeaderProps) => {
  const getDifficultyStyle = () => {
    if (difficultyLevel === 'Advanced') return workoutPdfStyles.advancedLabel;
    if (difficultyLevel === 'Intermediate') return workoutPdfStyles.intermediateLabel;
    return workoutPdfStyles.beginnerLabel;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={workoutPdfStyles.sectionTitle}>Workout Plan</Text>
      
      <View style={[workoutPdfStyles.difficultyLabel, getDifficultyStyle()]}>
        <Text>{difficultyLevel}</Text>
      </View>
    </View>
  );
};

export default PDFWorkoutHeader;
