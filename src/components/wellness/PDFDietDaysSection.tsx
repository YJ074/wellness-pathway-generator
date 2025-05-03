
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { estimateMacros, getEstimatedCalories } from './utils/pdfCalorieUtils';
import { DietPlan, FormData, WorkoutPlan } from './types';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  daySection: {
    marginBottom: 30,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 15,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
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
  exerciseLabel: {
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
  exerciseItem: {
    marginBottom: 5,
  }
});

interface PDFDietDaysSectionProps {
  dietPlan: DietPlan;
  formData: FormData;
  workoutPlan?: WorkoutPlan;
}

const PDFDietDaysSection = ({ dietPlan, formData, workoutPlan }: PDFDietDaysSectionProps) => {
  const goalFactor = formData.fitnessGoal === 'weight-loss' ? 0.9 : 
                    formData.fitnessGoal === 'muscle-gain' ? 1.15 : 1;
                    
  return (
    <View style={styles.container}>
      {dietPlan.days.map((day) => {
        // Calculate estimated calories for this day
        const dailyCalories = day.calories || dietPlan.dailyCalories || 2000;
        const macros = estimateMacros(dailyCalories, formData.fitnessGoal || 'maintenance');
        
        // Calculate estimated workout calories burned
        const workoutDay = workoutPlan?.days.find(w => w.day === day.day);
        const isRestDay = workoutDay?.isRestDay || false;
        const estimatedCaloriesBurned = isRestDay ? 100 : 
                                        formData.exerciseFrequency === '5+' ? 350 :
                                        formData.exerciseFrequency === '3-4' ? 280 : 200;
        
        return (
          <View key={`day-${day.day}`} style={styles.daySection}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            
            {/* Diet Plan Section */}
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
            
            {/* Workout Plan Section */}
            <View style={styles.planSection}>
              <Text style={styles.sectionTitle}>💪 Workout Plan:</Text>
              
              {workoutDay ? (
                workoutDay.isRestDay ? (
                  <Text style={styles.text}>
                    Rest Day - Focus on recovery with light stretching and mobility work. 
                    Practice Shavasana (corpse pose) and deep breathing for relaxation.
                  </Text>
                ) : (
                  <View>
                    <Text style={styles.text}>
                      <Text style={styles.exerciseLabel}>Warm-up (5 min): </Text>
                      {workoutDay.warmup.join(', ')}
                    </Text>
                    
                    <Text style={styles.exerciseLabel}>Main Exercises (15-20 min):</Text>
                    {workoutDay.exercises.map((exercise, idx) => (
                      <View key={`ex-${day.day}-${idx}`} style={styles.exerciseItem}>
                        <Text style={styles.text}>
                          • {exercise.name} - {exercise.reps}
                          {exercise.description ? ` (${exercise.description})` : ''}
                        </Text>
                      </View>
                    ))}
                    
                    <Text style={styles.text}>
                      <Text style={styles.exerciseLabel}>Cool-down (5 min): </Text>
                      {workoutDay.cooldown.join(', ')}
                    </Text>
                    
                    <Text style={styles.nutritionText}>
                      🔥 Estimated Calories Burned: ~{estimatedCaloriesBurned} kcal
                    </Text>
                  </View>
                )
              ) : (
                <Text style={styles.text}>
                  No workout data available for this day.
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PDFDietDaysSection;
