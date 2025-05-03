
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
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  mealLabel: {
    fontWeight: 'bold',
    display: 'inline',
  },
  exerciseLabel: {
    fontWeight: 'bold',
  },
});

interface WellnessPDFContainerProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const WellnessPDFContainer = ({ formData, dietPlan, workoutPlan }: WellnessPDFContainerProps) => (
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
    
    {/* Simplified 75-day plan with diet and workout */}
    <View style={styles.container}>
      {dietPlan.days.map((day) => (
        <View key={`day-${day.day}`} style={styles.daySection}>
          <Text style={styles.dayTitle}>Day {day.day}</Text>
          
          {/* Diet Plan */}
          <Text style={styles.sectionTitle}>Diet Plan:</Text>
          <Text style={styles.text}>
            <Text style={styles.mealLabel}>Breakfast: </Text>
            {day.breakfast}
          </Text>
          
          {day.midMorningSnack && (
            <Text style={styles.text}>
              <Text style={styles.mealLabel}>Mid-Morning Snack: </Text>
              {day.midMorningSnack}
            </Text>
          )}
          
          <Text style={styles.text}>
            <Text style={styles.mealLabel}>Lunch: </Text>
            {day.lunch}
          </Text>
          
          {day.eveningSnack && (
            <Text style={styles.text}>
              <Text style={styles.mealLabel}>Evening Snack: </Text>
              {day.eveningSnack}
            </Text>
          )}
          
          <Text style={styles.text}>
            <Text style={styles.mealLabel}>Dinner: </Text>
            {day.dinner}
          </Text>
          
          {day.calories && (
            <Text style={styles.text}>
              <Text style={styles.mealLabel}>Total Calories: </Text>
              {day.calories} kcal
            </Text>
          )}
          
          {/* Workout Plan */}
          {workoutPlan && workoutPlan.days.find(w => w.day === day.day) && (
            <>
              <Text style={styles.sectionTitle}>Workout Plan:</Text>
              {(() => {
                const workoutDay = workoutPlan.days.find(w => w.day === day.day);
                if (!workoutDay) return null;
                
                if (workoutDay.isRestDay) {
                  return <Text style={styles.text}>Rest Day - Focus on recovery and light stretching</Text>;
                }
                
                return (
                  <>
                    <Text style={styles.text}>
                      <Text style={styles.exerciseLabel}>Warm-up: </Text>
                      {workoutDay.warmup.join(', ')}
                    </Text>
                    
                    <Text style={styles.sectionTitle}>Exercises:</Text>
                    {workoutDay.exercises.map((exercise, idx) => (
                      <Text key={`ex-${day.day}-${idx}`} style={styles.text}>
                        {exercise.name} - {exercise.reps}
                        {exercise.description ? ` (${exercise.description})` : ''}
                      </Text>
                    ))}
                    
                    <Text style={styles.text}>
                      <Text style={styles.exerciseLabel}>Cool-down: </Text>
                      {workoutDay.cooldown.join(', ')}
                    </Text>
                  </>
                );
              })()}
            </>
          )}
        </View>
      ))}
    </View>
  </View>
);

export default WellnessPDFContainer;
