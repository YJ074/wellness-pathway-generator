
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import PDFHeaderSection from './PDFHeaderSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFDietDaysSection from './PDFDietDaysSection';

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
    // Removing 'display: inline' which is causing the TypeScript error
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

interface WellnessPDFContainerProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

// Helper function to estimate calories for each meal type
const getEstimatedCalories = (mealType: string, baseCalories: number, goalFactor: number): number => {
  const mealFactors: Record<string, number> = {
    'breakfast': 0.25,
    'midMorningSnack': 0.1,
    'lunch': 0.35,
    'eveningSnack': 0.1, 
    'dinner': 0.2
  };
  
  return Math.round((baseCalories * mealFactors[mealType] || 0) * goalFactor);
};

// Helper to estimate macros based on calories and goals
const estimateMacros = (totalCalories: number, fitnessGoal: string) => {
  let proteinPct = 0.25;
  let fatPct = 0.3;
  let carbsPct = 0.45;
  
  // Adjust macros based on goal
  if (fitnessGoal === 'weight-loss') {
    proteinPct = 0.3;
    fatPct = 0.25;
    carbsPct = 0.45;
  } else if (fitnessGoal === 'muscle-gain') {
    proteinPct = 0.35;
    fatPct = 0.25;
    carbsPct = 0.4;
  }
  
  const proteinGrams = Math.round((totalCalories * proteinPct) / 4); // 4 cal per gram
  const fatGrams = Math.round((totalCalories * fatPct) / 9); // 9 cal per gram
  const carbGrams = Math.round((totalCalories * carbsPct) / 4); // 4 cal per gram
  
  return { protein: proteinGrams, fat: fatGrams, carbs: carbGrams };
};

const WellnessPDFContainer = ({ formData, dietPlan, workoutPlan }: WellnessPDFContainerProps) => {
  const goalFactor = formData.fitnessGoal === 'weight-loss' ? 0.9 : 
                     formData.fitnessGoal === 'muscle-gain' ? 1.15 : 1;
                     
  return (
    <View>
      <PDFHeaderSection name={formData.name} />
      {dietPlan.bmi && dietPlan.bmr && dietPlan.dailyCalories && (
        <PDFMetricsSection
          bmi={dietPlan.bmi}
          bmiCategory={dietPlan.bmiCategory || ''}
          bmr={dietPlan.bmr}
          dailyCalories={dietPlan.dailyCalories}
          hasMuscularBuild={!!formData.has_muscular_build}
        />
      )}
      <PDFPersonalInfoSection formData={formData} />
      
      {/* Enhanced 75-day plan with diet and workout */}
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
    </View>
  );
};

export default WellnessPDFContainer;
