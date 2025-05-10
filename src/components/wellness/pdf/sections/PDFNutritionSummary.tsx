
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { getProteinPerKgRequirement } from '@/utils/diet/helpers/portionTypes/proteinPortions';

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
  proteinNote: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#555',
    lineHeight: 1.3,
    marginTop: 2,
    fontFamily: 'Helvetica',
  }
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
  dietaryPreference?: string;
  exerciseFrequency?: string;
}

const PDFNutritionSummary = ({ 
  dailyCalories, 
  water, 
  macros,
  gender,
  weightKg,
  dietaryPreference,
  exerciseFrequency,
  fitnessGoal
}: PDFNutritionSummaryProps) => {
  // Add protein calculation note based on activity level
  let proteinNote = '';
  if (weightKg && exerciseFrequency && fitnessGoal) {
    const proteinPerKg = getProteinPerKgRequirement(exerciseFrequency, fitnessGoal);
    proteinNote = `(${proteinPerKg.toFixed(1)}g per kg bodyweight)`;
  } else if (gender && weightKg) {
    // Fallback to old calculation if activity not provided
    const proteinFactor = gender === 'female' ? '1' : '1.2-1.5'; 
    proteinNote = `(${proteinFactor}g per kg bodyweight)`;
  }
  
  // Add specific protein source recommendations based on dietary preference
  let proteinSources = '';
  if (dietaryPreference) {
    const proteinRecommendations: Record<string, string> = {
      'vegan': 'Key protein sources: legumes, tofu, tempeh, seitan, nutritional yeast, plant protein powders',
      'lacto-vegetarian': 'Key protein sources: dairy, paneer, legumes, beans, lentils, nuts, seeds',
      'lacto-ovo-vegetarian': 'Key protein sources: eggs, dairy, legumes, beans, lentils, nuts, seeds',
      'pure-vegetarian': 'Key protein sources: dairy, paneer, soy products, legumes, beans, lentils',
      'sattvic': 'Key protein sources: dairy, legumes (especially mung), nuts, seeds, whole grains',
      'pure-jain': 'Key protein sources: dairy, approved legumes, nuts, seeds (avoid fermented foods)',
      'non-vegetarian': 'Key protein sources: eggs, lean poultry, fish, dairy, legumes, nuts'
    };
    
    proteinSources = proteinRecommendations[dietaryPreference] || '';
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
      {proteinSources && <Text style={styles.proteinNote}>{proteinSources}</Text>}
    </View>
  );
};

export default PDFNutritionSummary;
