
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros, getEstimatedCalories } from '../utils/pdfCalorieUtils';
import { DietPlan, FormData } from '../types';

const styles = StyleSheet.create({
  planSection: {
    marginBottom: 20,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 6,
    borderRadius: 3,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  mealItem: {
    marginBottom: 12,
  },
  mealLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  mealDescription: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  calorieInfo: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  nutritionBox: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
  },
  nutritionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  nutritionText: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
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
      <Text style={styles.sectionTitle}>Diet Plan</Text>
      
      {/* Breakfast */}
      <View style={styles.mealItem}>
        <Text style={styles.mealLabel}>• Breakfast</Text>
        <Text style={styles.mealDescription}>{day.breakfast}</Text>
        <Text style={styles.calorieInfo}>
          Calories: {getEstimatedCalories('breakfast', dailyCalories, goalFactor)} kcal
        </Text>
      </View>
      
      {/* Mid-Morning Snack */}
      {day.midMorningSnack && (
        <View style={styles.mealItem}>
          <Text style={styles.mealLabel}>• Mid-Morning Snack</Text>
          <Text style={styles.mealDescription}>{day.midMorningSnack}</Text>
          <Text style={styles.calorieInfo}>
            Calories: {getEstimatedCalories('midMorningSnack', dailyCalories, goalFactor)} kcal
          </Text>
        </View>
      )}
      
      {/* Lunch */}
      <View style={styles.mealItem}>
        <Text style={styles.mealLabel}>• Lunch</Text>
        <Text style={styles.mealDescription}>{day.lunch}</Text>
        <Text style={styles.calorieInfo}>
          Calories: {getEstimatedCalories('lunch', dailyCalories, goalFactor)} kcal
        </Text>
      </View>
      
      {/* Evening Snack */}
      {day.eveningSnack && (
        <View style={styles.mealItem}>
          <Text style={styles.mealLabel}>• Evening Snack</Text>
          <Text style={styles.mealDescription}>{day.eveningSnack}</Text>
          <Text style={styles.calorieInfo}>
            Calories: {getEstimatedCalories('eveningSnack', dailyCalories, goalFactor)} kcal
          </Text>
        </View>
      )}
      
      {/* Dinner */}
      <View style={styles.mealItem}>
        <Text style={styles.mealLabel}>• Dinner</Text>
        <Text style={styles.mealDescription}>{day.dinner}</Text>
        <Text style={styles.calorieInfo}>
          Calories: {getEstimatedCalories('dinner', dailyCalories, goalFactor)} kcal
        </Text>
      </View>
      
      {/* Nutrition Summary Box */}
      <View style={styles.nutritionBox}>
        <Text style={styles.nutritionTitle}>Daily Nutrition Summary</Text>
        <Text style={styles.nutritionText}>
          Total Calories: {dailyCalories} kcal  •  Water: {day.water || 2.5}L
        </Text>
        <Text style={styles.nutritionText}>
          Macronutrients: Protein: {macros.protein}g  •  Carbs: {macros.carbs}g  •  Fats: {macros.fat}g
        </Text>
        <Text style={styles.nutritionText}>
          Micronutrients: Calcium, Iron, Vitamins A, B-complex (B12), C, D, E, Zinc, Magnesium
        </Text>
      </View>
    </View>
  );
};

export default PDFDietSection;
