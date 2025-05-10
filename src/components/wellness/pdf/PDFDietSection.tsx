
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros } from '../utils/pdfCalorieUtils';
import { FormData } from '../types';
import PDFMealItem from './sections/PDFMealItem';
import PDFNutritionSummary from './sections/PDFNutritionSummary';
import PDFWellnessBenefits from './sections/PDFWellnessBenefits';
import PDFRegionalNote from './sections/PDFRegionalNote';

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
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
  spacing: {
    marginBottom: 8, // Add spacing between meal sections
  }
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
  
  // Get weight in kg for protein calculation
  const weightKg = formData.weight ? parseInt(formData.weight) : 70;
  
  // Pass weight to macro calculator
  const macros = estimateMacros(dailyCalories, formData.fitnessGoal || 'maintenance', weightKg);
  
  return (
    <View style={styles.planSection}>
      <Text style={styles.sectionTitle}>Diet Plan</Text>
      
      {/* Regional Note */}
      <PDFRegionalNote regionalNote={day.regionalNote} />
      
      {/* Breakfast */}
      <View style={styles.spacing}>
        <PDFMealItem 
          label="Breakfast"
          description={day.breakfast}
          mealType="breakfast"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
        />
      </View>
      
      {/* Mid-Morning Snack */}
      {day.midMorningSnack && (
        <View style={styles.spacing}>
          <PDFMealItem 
            label="Mid-Morning Snack"
            description={day.midMorningSnack}
            mealType="midMorningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
          />
        </View>
      )}
      
      {/* Lunch */}
      <View style={styles.spacing}>
        <PDFMealItem 
          label="Lunch"
          description={day.lunch}
          mealType="lunch"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
        />
      </View>
      
      {/* Evening Snack */}
      {day.eveningSnack && (
        <View style={styles.spacing}>
          <PDFMealItem 
            label="Evening Snack"
            description={day.eveningSnack}
            mealType="eveningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
          />
        </View>
      )}
      
      {/* Dinner */}
      <View style={styles.spacing}>
        <PDFMealItem 
          label="Dinner"
          description={day.dinner}
          mealType="dinner"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
        />
      </View>
      
      {/* Nutrition Summary Box */}
      <View style={styles.spacing}>
        <PDFNutritionSummary 
          dailyCalories={dailyCalories}
          water={day.water || 2.5}
          macros={macros}
        />
      </View>
      
      {/* Wellness Benefits Section */}
      <PDFWellnessBenefits 
        hairNutrients={day.hairNutrients}
        skinNutrients={day.skinNutrients}
        fatLossNotes={day.fatLossNotes}
        herbalRecommendations={day.herbalRecommendations}
      />
    </View>
  );
};

export default PDFDietSection;
