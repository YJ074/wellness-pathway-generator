
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { workoutPdfStyles } from '../utils/workoutPdfStyles';

interface PDFRestDayContentProps {
  isRecoveryDay: boolean;
  estimatedCaloriesBurned: number;
}

const PDFRestDayContent = ({ isRecoveryDay, estimatedCaloriesBurned }: PDFRestDayContentProps) => {
  return (
    <View>
      <Text style={workoutPdfStyles.restDayText}>
        {isRecoveryDay ? 
          "Recovery Day - Focus on breathwork and gentle mobility. Practice deep breathing exercises (Pranayama) and light stretching to help your body recover." : 
          "Rest Day - Focus on recovery with light stretching and mobility work. Practice Shavasana (corpse pose) and deep breathing for relaxation."
        }
      </Text>
      
      {isRecoveryDay && (
        <Text style={workoutPdfStyles.recoveryNote}>
          Weekly recovery is essential for progress and injury prevention.
        </Text>
      )}
      
      <Text style={workoutPdfStyles.calorieInfo}>
        Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
      </Text>
    </View>
  );
};

export default PDFRestDayContent;
