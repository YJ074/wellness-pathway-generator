
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan, WorkoutDay } from './types';
import PDFDietSection from './pdf/PDFDietSection';
import PDFWorkoutSection from './pdf/PDFWorkoutSection';
import { estimateMacros } from './utils/pdfCalorieUtils';
import PDFNutritionSummary from './pdf/sections/PDFNutritionSummary';

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginTop: 10,
  },
  daySection: {
    marginBottom: 40, // Increased from 30 to 40
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  pageBreak: {
    breakAfter: 'page',
  },
  nutritionContainer: {
    marginTop: 10,
    marginBottom: 15,
  }
});

interface PDFDietDaysSectionProps {
  dietPlan: DietPlan;
  formData: FormData;
  workoutPlan?: WorkoutPlan;
}

const PDFDietDaysSection = ({ dietPlan, formData, workoutPlan }: PDFDietDaysSectionProps) => {
  // Calculate weight in kg for nutrition display
  const weightKg = parseInt(formData.weight) || 70;
  
  return (
    <View style={styles.container}>
      {dietPlan.days.map((day, index) => {
        // Find matching workout day
        const workoutDay = workoutPlan?.days.find(w => w.day === day.day);
        
        // Calculate macros for this day
        const macros = estimateMacros(
          day.calories || 2000,
          formData.fitnessGoal || 'maintenance',
          weightKg,
          formData.gender
        );
        
        return (
          <View key={`day-${day.day}`} style={styles.daySection} wrap={true} break={index > 0 && index % 3 === 0}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            
            {/* Nutrition Summary Section */}
            <View style={styles.nutritionContainer}>
              <PDFNutritionSummary 
                dailyCalories={day.calories || 2000} 
                water={day.water || 2.5} 
                macros={macros}
                weightKg={weightKg}
                gender={formData.gender}
                fitnessGoal={formData.fitnessGoal}
              />
            </View>
            
            {/* Diet Plan Section */}
            <PDFDietSection day={day} formData={formData} />
            
            {/* Workout Plan Section */}
            {workoutDay && (
              <PDFWorkoutSection 
                workoutDay={workoutDay as WorkoutDay} 
                formData={formData} 
                dayNumber={day.day} 
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default PDFDietDaysSection;
