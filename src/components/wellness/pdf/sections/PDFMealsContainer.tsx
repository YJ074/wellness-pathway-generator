
import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import PDFMealItem from './PDFMealItem';
import { FormData } from '../../types';

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
    padding: 2,
  }
});

interface PDFMealsContainerProps {
  breakfast: string;
  lunch: string;
  dinner: string;
  midMorningSnack?: string;
  eveningSnack?: string;
  dailyCalories: number;
  goalFactor: number;
}

const PDFMealsContainer = ({
  breakfast,
  lunch,
  dinner,
  midMorningSnack,
  eveningSnack,
  dailyCalories,
  goalFactor
}: PDFMealsContainerProps) => {
  return (
    <>
      {/* Breakfast with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Breakfast"
          description={breakfast}
          mealType="breakfast"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={true}
        />
      </View>
      
      {/* Mid-Morning Snack with improved spacing */}
      {midMorningSnack && (
        <View style={styles.spacing} wrap={false}>
          <PDFMealItem 
            label="Mid-Morning Snack"
            description={midMorningSnack}
            mealType="midMorningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
            applyDeduplication={true}
          />
        </View>
      )}
      
      {/* Lunch with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Lunch"
          description={lunch}
          mealType="lunch"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={true}
        />
      </View>
      
      {/* Evening Snack with improved spacing */}
      {eveningSnack && (
        <View style={styles.spacing} wrap={false}>
          <PDFMealItem 
            label="Evening Snack"
            description={eveningSnack}
            mealType="eveningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
            applyDeduplication={true}
          />
        </View>
      )}
      
      {/* Dinner with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Dinner"
          description={dinner}
          mealType="dinner"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={true}
        />
      </View>
    </>
  );
};

export default PDFMealsContainer;
