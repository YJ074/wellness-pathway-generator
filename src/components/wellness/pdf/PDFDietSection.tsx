
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros, getEstimatedCalories } from '../utils/pdfCalorieUtils';
import { DietPlan, FormData } from '../types';

const styles = StyleSheet.create({
  planSection: {
    marginBottom: 15,
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
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
  wellnessBox: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#e6f2ff',
    borderRadius: 3,
  },
  wellnessTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#0066cc',
  },
  wellnessItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  herbalTitle: {
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
    fontFamily: 'Roboto',
    fontWeight: 700,
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
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
    regionalNote?: string;
  };
  formData: FormData;
}

const PDFDietSection = ({ day, formData }: PDFDietSectionProps) => {
  const goalFactor = formData.fitnessGoal === 'weight-loss' ? 0.9 : 
                    formData.fitnessGoal === 'muscle-gain' ? 1.15 : 1;
  
  // Calculate estimated calories for this day
  const dailyCalories = day.calories || 2000;
  const macros = estimateMacros(dailyCalories, formData.fitnessGoal || 'maintenance');
  
  // Check if we have any wellness benefits to display
  const hasWellnessBenefits = day.hairNutrients || day.skinNutrients || day.fatLossNotes || 
                             (day.herbalRecommendations && day.herbalRecommendations.length > 0);
  
  return (
    <View style={styles.planSection}>
      <Text style={styles.sectionTitle}>Diet Plan</Text>
      
      {/* Regional Note */}
      {day.regionalNote && (
        <View style={{...styles.nutritionBox, backgroundColor: '#fff8e6', marginBottom: 8}}>
          <Text style={{...styles.nutritionText, fontStyle: 'italic'}}>{day.regionalNote}</Text>
        </View>
      )}
      
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
      
      {/* Wellness Benefits Section */}
      {hasWellnessBenefits && (
        <View style={styles.wellnessBox}>
          <Text style={styles.wellnessTitle}>Wellness Benefits</Text>
          
          {day.hairNutrients && (
            <Text style={styles.wellnessItem}>• Hair Health: {day.hairNutrients}</Text>
          )}
          
          {day.skinNutrients && (
            <Text style={styles.wellnessItem}>• Skin Health: {day.skinNutrients}</Text>
          )}
          
          {day.fatLossNotes && (
            <Text style={styles.wellnessItem}>• Weight Management: {day.fatLossNotes}</Text>
          )}
          
          {day.herbalRecommendations && day.herbalRecommendations.length > 0 && (
            <View>
              <Text style={styles.herbalTitle}>Recommended Beverages:</Text>
              {day.herbalRecommendations.map((herb, index) => (
                <Text key={index} style={styles.wellnessItem}>• {herb}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default PDFDietSection;
