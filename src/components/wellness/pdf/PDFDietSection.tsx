
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros, getEstimatedCalories } from '../utils/pdfCalorieUtils';
import { DietPlan, FormData } from '../types';

const styles = StyleSheet.create({
  planSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
    backgroundColor: '#f9f9f9',
    padding: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  mealLabel: {
    fontWeight: 'bold',
  },
  nutritionBox: {
    marginTop: 8,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
  },
  nutritionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  nutritionText: {
    fontSize: 9,
    marginBottom: 2,
  },
});

interface PDFDietSectionProps {
  day: {
    day: number;
    breakfast: string;
    midMorningSnack?: string;
    lunch: string;
    eveningSnack?: string;
    dinner: string;
    calories?: number;
    water?: number;
  };
  formData: FormData;
}

const PDFDietSection = ({ day, formData }: PDFDietSectionProps) => {
  const goalFactor = formData.fitnessGoal === 'weight-loss' ? 0.9 : 
                    formData.fitnessGoal === 'muscle-gain' ? 1.15 : 1;
  
  // Calculate estimated calories for this day
  const dailyCalories = day.calories || 2000;
  const macros = estimateMacros(dailyCalories, formData.fitnessGoal || 'maintenance');
  
  return (
    <View style={styles.planSection}>
      <Text style={styles.sectionTitle}>🍽️ Diet Plan:</Text>
      
      <Text style={styles.text}>
        <Text style={styles.mealLabel}>Breakfast: </Text>
        {day.breakfast} ({getEstimatedCalories('breakfast', dailyCalories, goalFactor)} kcal)
      </Text>
      
      {day.midMorningSnack && (
        <Text style={styles.text}>
          <Text style={styles.mealLabel}>Mid-Morning Snack: </Text>
          {day.midMorningSnack} ({getEstimatedCalories('midMorningSnack', dailyCalories, goalFactor)} kcal)
        </Text>
      )}
      
      <Text style={styles.text}>
        <Text style={styles.mealLabel}>Lunch: </Text>
        {day.lunch} ({getEstimatedCalories('lunch', dailyCalories, goalFactor)} kcal)
      </Text>
      
      {day.eveningSnack && (
        <Text style={styles.text}>
          <Text style={styles.mealLabel}>Evening Snack: </Text>
          {day.eveningSnack} ({getEstimatedCalories('eveningSnack', dailyCalories, goalFactor)} kcal)
        </Text>
      )}
      
      <Text style={styles.text}>
        <Text style={styles.mealLabel}>Dinner: </Text>
        {day.dinner} ({getEstimatedCalories('dinner', dailyCalories, goalFactor)} kcal)
      </Text>
      
      <View style={styles.nutritionBox}>
        <Text style={styles.nutritionTitle}>🧪 Daily Nutrition:</Text>
        <Text style={styles.nutritionText}>
          Total Calories: {dailyCalories} kcal  •  Water: {day.water || 2.5}L
        </Text>
        <Text style={styles.nutritionText}>
          Protein: {macros.protein}g  •  Carbs: {macros.carbs}g  •  Fats: {macros.fat}g
        </Text>
        <Text style={styles.nutritionText}>
          Est. Micronutrients: Calcium, Iron, Vitamins A, B-complex, C, D, E
        </Text>
      </View>
    </View>
  );
};

export default PDFDietSection;
