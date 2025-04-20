
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DietPlan, WorkoutPlan, FormData } from './types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#334155',
  },
  dayContainer: {
    marginBottom: 15,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 10,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mealContainer: {
    marginBottom: 8,
  },
  mealLabel: {
    fontWeight: 'bold',
  },
  exerciseContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 10,
  },
  exerciseImage: {
    width: 100,
    height: 80,
    objectFit: 'cover',
  },
  exerciseDetails: {
    flex: 1,
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan;
}

const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Personalized 75-Day Wellness Plan for {formData.name}
      </Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Diet Plan</Text>
        {dietPlan.days.slice(0, 3).map((day) => (
          <View key={day.day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            <View style={styles.mealContainer}>
              <Text style={styles.mealLabel}>Breakfast:</Text>
              <Text>{day.breakfast}</Text>
            </View>
            <View style={styles.mealContainer}>
              <Text style={styles.mealLabel}>Lunch:</Text>
              <Text>{day.lunch}</Text>
            </View>
            <View style={styles.mealContainer}>
              <Text style={styles.mealLabel}>Dinner:</Text>
              <Text>{day.dinner}</Text>
            </View>
            <View style={styles.mealContainer}>
              <Text style={styles.mealLabel}>Snacks:</Text>
              <Text>{day.snacks}</Text>
            </View>
          </View>
        ))}
        <Text>... and more days in your complete plan</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Exercise Plan</Text>
        {workoutPlan.days.slice(0, 3).map((day) => (
          <View key={day.day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            {day.isRestDay ? (
              <Text>Rest Day - Focus on recovery and light stretching</Text>
            ) : (
              <>
                {day.exercises.map((exercise, index) => (
                  <View key={index} style={styles.exerciseContainer}>
                    {exercise.imageUrl && (
                      <Image src={exercise.imageUrl} style={styles.exerciseImage} />
                    )}
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.mealLabel}>{exercise.name}</Text>
                      <Text>{exercise.reps}</Text>
                      <Text>{exercise.description}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        ))}
        <Text>... and more days in your complete plan</Text>
      </View>
    </Page>
  </Document>
);

export default WellnessPDF;
