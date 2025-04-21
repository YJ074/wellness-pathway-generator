
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
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
  dayBlock: {
    marginBottom: 28,
    borderBottom: '1pt solid #e2e8f0',
    paddingBottom: 12,
  },
  dayHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#334155',
    fontWeight: 'bold',
  },
  sectionLabel: {
    fontSize: 15,
    color: '#047857',
    marginTop: 2,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#3b3b3b',
  },
  mealText: {
    fontSize: 12,
    marginBottom: 2
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2,
    color: '#1e293b'
  },
  exerciseReps: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  exerciseDesc: {
    fontSize: 11,
    marginBottom: 2,
  },
  tutorialLinks: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  linkStyle: {
    fontSize: 10,
    color: '#2563eb',
    textDecoration: 'underline',
    marginRight: 8,
  },
  restDay: {
    color: '#018430',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  warmupCdLabel: {
    fontSize: 11,
    marginTop: 3,
    marginBottom: 2,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  warmupCdItem: {
    fontSize: 10,
    marginLeft: 8,
    marginBottom: 1,
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
      {dietPlan.days.map((dietDay, idx) => {
        const workoutDay = workoutPlan.days[idx];
        return (
          <View key={dietDay.day} style={styles.dayBlock}>
            {/* Diet Plan Section */}
            <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
            <View>
              <Text style={styles.mealLabel}>Breakfast:</Text>
              <Text style={styles.mealText}>{dietDay.breakfast}</Text>
              <Text style={styles.mealLabel}>Lunch:</Text>
              <Text style={styles.mealText}>{dietDay.lunch}</Text>
              <Text style={styles.mealLabel}>Dinner:</Text>
              <Text style={styles.mealText}>{dietDay.dinner}</Text>
              <Text style={styles.mealLabel}>Snacks:</Text>
              <Text style={styles.mealText}>{dietDay.snacks}</Text>
            </View>

            {/* Exercise Plan Section */}
            <Text style={styles.dayHeader}>Day {dietDay.day} Exercise Plan</Text>
            {workoutDay.isRestDay ? (
              <Text style={styles.restDay}>
                Rest Day - Focus on recovery and light stretching
              </Text>
            ) : (
              <View>
                <Text style={styles.warmupCdLabel}>Warm-up:</Text>
                {workoutDay.warmup.map((item, i) => (
                  <Text style={styles.warmupCdItem} key={i}>• {item}</Text>
                ))}

                <Text style={styles.sectionLabel}>Main Exercises:</Text>
                {workoutDay.exercises.map((exercise, i) => (
                  <View key={i} wrap={false}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseReps}>{exercise.reps}</Text>
                    <Text style={styles.exerciseDesc}>{exercise.description}</Text>
                    <View style={styles.tutorialLinks}>
                      {exercise.tutorialUrl && (
                        <Link style={styles.linkStyle} src={exercise.tutorialUrl}>
                          Tutorial (English)
                        </Link>
                      )}
                      {/* Hindi link, if present in your data structure */}
                      {exercise.tutorialUrlHindi && (
                        <Link style={styles.linkStyle} src={exercise.tutorialUrlHindi}>
                          Tutorial (Hindi)
                        </Link>
                      )}
                    </View>
                  </View>
                ))}

                <Text style={styles.warmupCdLabel}>Cool-down:</Text>
                {workoutDay.cooldown.map((item, i) => (
                  <Text style={styles.warmupCdItem} key={i}>• {item}</Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </Page>
  </Document>
);

export default WellnessPDF;

