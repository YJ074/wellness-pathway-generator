
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { getProteinPerKgRequirement } from '@/utils/diet/helpers/portionTypes/protein';

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
  },
  macroDetail: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.3,
    marginTop: 1,
    fontFamily: 'Helvetica',
  },
  macroRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  macroItem: {
    marginRight: 8,
  },
  summaryRow: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  genderNote: {
    fontSize: 10,
    color: '#3b82f6',
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
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
  // Calculate protein per kg for the nutritional note
  let proteinNote = '';
  let proteinPerKg = 0;
  
  if (weightKg && macros.protein) {
    // Calculate actual g/kg being recommended
    proteinPerKg = Number((macros.protein / weightKg).toFixed(1));
    
    if (exerciseFrequency && fitnessGoal) {
      // Show target range based on activity and gender
      const recommendedProteinPerKg = getProteinPerKgRequirement(exerciseFrequency, fitnessGoal, gender);
      proteinNote = `(${proteinPerKg}g per kg bodyweight - target: ${recommendedProteinPerKg.toFixed(1)}g/kg)`;
    } else {
      // Simplified display if activity details missing
      proteinNote = `(${proteinPerKg}g per kg bodyweight)`;
    }
  } else if (gender && weightKg) {
    // Fallback if we don't have complete information
    const genderBasedRange = gender === 'male' ? "0.9-2.2g" : "0.8-2.0g";
    proteinNote = `(${genderBasedRange} per kg bodyweight recommended range)`;
  }
  
  // Calculate macro percentages
  const totalCalories = (macros.protein * 4) + (macros.carbs * 4) + (macros.fat * 9);
  const proteinPct = Math.round((macros.protein * 4 / totalCalories) * 100);
  const carbsPct = Math.round((macros.carbs * 4 / totalCalories) * 100);
  const fatPct = Math.round((macros.fat * 9 / totalCalories) * 100);
  
  // Add specific protein source recommendations based on dietary preference
  let proteinSources = '';
  if (dietaryPreference) {
    const proteinRecommendations: Record<string, string> = {
      'vegan': 'Key protein sources: legumes, tofu, tempeh, seitan, nutritional yeast, plant protein powders',
      'lacto-vegetarian': 'Key protein sources: dairy, paneer, legumes, beans, lentils, nuts, seeds',
      'lacto-ovo-vegetarian': 'Key protein sources: eggs, dairy, legumes, beans, lentils, nuts, seeds',
      'pure-vegetarian': 'Key protein sources: dairy, paneer, soy products, legumes, beans, lentils',
      'sattvic': 'Key protein sources: dairy, legumes (especially mung), nuts, seeds, whole grains',
      'jain': 'Key protein sources: dairy, approved legumes, nuts, seeds (avoid fermented foods)',
      'non-vegetarian': 'Key protein sources: eggs, lean poultry, fish, dairy, legumes, nuts'
    };
    
    proteinSources = proteinRecommendations[dietaryPreference] || '';
  }
  
  // Get gender-specific nutrient notes according to Indian RDA
  let genderSpecificNote = '';
  if (gender === 'male') {
    genderSpecificNote = 'Males: Focus on higher protein, calcium (1000mg), iron (17mg), zinc (12mg)';
  } else if (gender === 'female') {
    genderSpecificNote = 'Females: Focus on iron (21mg), calcium (1000mg), folate (200μg), vitamin B12 (1μg)';
  }
  
  return (
    <View style={styles.nutritionBox}>
      <Text style={styles.nutritionTitle}>Daily Nutrition Summary</Text>
      
      {/* Base nutrition info - formatted like your screenshot */}
      <Text style={styles.summaryRow}>
        Protein: {macros.protein}g per day (based on bodyweight) • Water: {water}L
      </Text>
      
      <Text style={styles.summaryRow}>
        Carbs: {macros.carbs}g • Fats: {macros.fat}g • Total: {dailyCalories} kcal
      </Text>
      
      <Text style={styles.macroDetail}>
        Distribution: Protein: {proteinPct}% • Carbs: {carbsPct}% • Fats: {fatPct}%
      </Text>
      
      <Text style={styles.nutritionText}>
        Micronutrients: Calcium, Iron, Vitamins A, B-complex (B12), C, D, E, Zinc, Magnesium
      </Text>
      
      {proteinSources && <Text style={styles.proteinNote}>{proteinSources}</Text>}
      
      {/* Add gender-specific nutritional information */}
      {genderSpecificNote && <Text style={styles.genderNote}>{genderSpecificNote}</Text>}
    </View>
  );
};

export default PDFNutritionSummary;
