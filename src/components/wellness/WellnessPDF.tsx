
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DietPlan, WorkoutPlan, FormData } from './types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: 90,
    height: 90,
    margin: '0 auto',
    marginBottom: 10,
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
    marginBottom: 8,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  exerciseDescription: {
    fontSize: 10,
    marginBottom: 2,
  },
  exerciseReps: {
    fontSize: 10,
    fontStyle: 'italic',
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
      <Image src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" style={styles.logo} />
      <Text style={styles.title}>
        Personalized 75-Day Wellness Plan for {formData.name}
      </Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Diet Plan</Text>
        {dietPlan.days.map((day) => (
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
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Exercise Plan</Text>
        {workoutPlan.days.map((day) => (
          <View key={day.day} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>Day {day.day}</Text>
            {day.isRestDay ? (
              <Text>Rest Day - Focus on recovery and light stretching</Text>
            ) : (
              <>
                {day.exercises.map((exercise, index) => (
                  <View key={index} style={styles.exerciseContainer}>
                    <View style={styles.exerciseDetails}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseReps}>{exercise.reps}</Text>
                      <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default WellnessPDF;
