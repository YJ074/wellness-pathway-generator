
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  nutritionBox: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
  },
  nutritionTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  nutritionText: {
    fontSize: 11,
    marginBottom: 4,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
});

interface PDFNutritionSummaryProps {
  dailyCalories: number;
  water: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  weightKg?: number;
  fitnessGoal?: string;
  gender?: string;
}

const PDFNutritionSummary = ({ 
  dailyCalories, 
  water, 
  macros,
  gender,
  weightKg
}: PDFNutritionSummaryProps) => {
  // Add protein calculation note if weight and gender are provided
  let proteinNote = '';
  if (gender && weightKg) {
    const proteinFactor = gender === 'female' ? '1' : '1.2-1.5'; 
    proteinNote = `(${proteinFactor}g per kg bodyweight)`;
  }
  
  return (
    <View style={styles.nutritionBox}>
      <Text style={styles.nutritionTitle}>Daily Nutrition Summary</Text>
      <Text style={styles.nutritionText}>
        Total Calories: {dailyCalories} kcal  •  Water: {water}L
      </Text>
      <Text style={styles.nutritionText}>
        Macronutrients: Protein: {macros.protein}g {proteinNote}  •  Carbs: {macros.carbs}g  •  Fats: {macros.fat}g
      </Text>
      <Text style={styles.nutritionText}>
        Micronutrients: Calcium, Iron, Vitamins A, B-complex (B12), C, D, E, Zinc, Magnesium
      </Text>
    </View>
  );
};

export default PDFNutritionSummary;
