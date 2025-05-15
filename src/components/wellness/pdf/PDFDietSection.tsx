import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros } from '../utils/pdfCalorieUtils';
import { FormData } from '../types';
import PDFMealItem from './sections/PDFMealItem';
import PDFNutritionSummary from './sections/PDFNutritionSummary';
import PDFWellnessBenefits from './sections/PDFWellnessBenefits';
import PDFRegionalNote from './sections/PDFRegionalNote';
import PDFMealTimings from './sections/PDFMealTimings';
import { applyTriplePassDeduplication } from '@/utils/diet/helpers/deduplication';

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
    marginBottom: 16, // Increased spacing between meal sections
    padding: 2, // Added slight padding to improve layout
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
    pcosFriendlyNotes?: string;
    herbalRecommendations?: string[];
    regionalNote?: string;
    mealTimings?: {
      breakfast: string;
      midMorningSnack: string;
      lunch: string;
      eveningSnack: string;
      dinner: string;
    };
    cheatMealInfo?: string | null;
    timingTips?: string;
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
  
  // Pre-process all meal descriptions with enhanced triple-pass deduplication
  const processedBreakfast = applyTriplePassDeduplication(day.breakfast);
  const processedLunch = applyTriplePassDeduplication(day.lunch);
  const processedDinner = applyTriplePassDeduplication(day.dinner);
  const processedMidMorningSnack = day.midMorningSnack ? 
    applyTriplePassDeduplication(day.midMorningSnack) : undefined;
  const processedEveningSnack = day.eveningSnack ? 
    applyTriplePassDeduplication(day.eveningSnack) : undefined;
    
  // Pass exercise frequency to macro calculator for protein calculation
  const macros = estimateMacros(
    dailyCalories, 
    formData.fitnessGoal || 'maintenance', 
    weightKg, 
    formData.gender,
    formData.dietaryPreference,
    formData.exerciseFrequency
  );
  
  return (
    <View style={styles.planSection}>
      <Text style={styles.sectionTitle}>Diet Plan</Text>
      
      {/* Regional Note */}
      <PDFRegionalNote regionalNote={day.regionalNote} />
      
      {/* Meal Timings Section with improved layout */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealTimings 
          mealTimings={day.mealTimings}
          cheatMealInfo={day.cheatMealInfo}
          timingTips={day.timingTips}
        />
      </View>
      
      {/* Breakfast with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Breakfast"
          description={processedBreakfast}
          mealType="breakfast"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={false} // Already deduplicated above
        />
      </View>
      
      {/* Mid-Morning Snack with improved spacing */}
      {processedMidMorningSnack && (
        <View style={styles.spacing} wrap={false}>
          <PDFMealItem 
            label="Mid-Morning Snack"
            description={processedMidMorningSnack}
            mealType="midMorningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
            applyDeduplication={false} // Already deduplicated above
          />
        </View>
      )}
      
      {/* Lunch with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Lunch"
          description={processedLunch}
          mealType="lunch"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={false} // Already deduplicated above
        />
      </View>
      
      {/* Evening Snack with improved spacing */}
      {processedEveningSnack && (
        <View style={styles.spacing} wrap={false}>
          <PDFMealItem 
            label="Evening Snack"
            description={processedEveningSnack}
            mealType="eveningSnack"
            dailyCalories={dailyCalories}
            goalFactor={goalFactor}
            applyDeduplication={false} // Already deduplicated above
          />
        </View>
      )}
      
      {/* Dinner with improved spacing */}
      <View style={styles.spacing} wrap={false}>
        <PDFMealItem 
          label="Dinner"
          description={processedDinner}
          mealType="dinner"
          dailyCalories={dailyCalories}
          goalFactor={goalFactor}
          applyDeduplication={false} // Already deduplicated above
        />
      </View>
      
      {/* Nutrition Summary Box */}
      <View style={styles.spacing}>
        <PDFNutritionSummary 
          dailyCalories={dailyCalories}
          water={day.water || 2.5}
          macros={macros}
          weightKg={weightKg}
          gender={formData.gender}
          dietaryPreference={formData.dietaryPreference}
          exerciseFrequency={formData.exerciseFrequency}
          fitnessGoal={formData.fitnessGoal}
        />
      </View>
      
      {/* Wellness Benefits Section */}
      <PDFWellnessBenefits 
        hairNutrients={day.hairNutrients}
        skinNutrients={day.skinNutrients}
        fatLossNotes={day.fatLossNotes}
        pcosFriendlyNotes={day.pcosFriendlyNotes}
        herbalRecommendations={day.herbalRecommendations}
      />
    </View>
  );
};

export default PDFDietSection;
