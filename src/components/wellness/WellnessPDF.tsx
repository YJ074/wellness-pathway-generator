import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';

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
    marginBottom: 10,
    textAlign: 'center',
    color: '#334155',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#64748b',
  },
  infoSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 5,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 12,
    color: '#334155',
  },
  metricsSection: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    width: '30%',
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  metricSubtext: {
    fontSize: 8,
    color: '#64748b',
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
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#3b3b3b',
    marginTop: 4,
  },
  mealText: {
    fontSize: 12,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  footnote: {
    fontSize: 10,
    marginTop: 8,
    color: '#64748b',
    fontStyle: 'italic',
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const WellnessPDF = ({ formData, dietPlan }: WellnessPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" style={styles.logo} />
        <Text style={styles.title}>
          Personalized 75-Day Wellness Plan
        </Text>
        <Text style={styles.subtitle}>
          Created for {formData.name}
        </Text>
        
        {dietPlan.bmi && dietPlan.bmr && dietPlan.dailyCalories && (
          <View style={styles.metricsSection}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>BMI</Text>
              <Text style={styles.metricValue}>{dietPlan.bmi.toFixed(1)}</Text>
              <Text style={styles.metricSubtext}>Category: {dietPlan.bmiCategory}</Text>
            </View>
            
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Base Metabolic Rate</Text>
              <Text style={styles.metricValue}>{dietPlan.bmr} kcal</Text>
              <Text style={styles.metricSubtext}>Calories at rest</Text>
            </View>
            
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Daily Target</Text>
              <Text style={styles.metricValue}>{dietPlan.dailyCalories} kcal</Text>
              <Text style={styles.metricSubtext}>Adjusted for your goal</Text>
            </View>
          </View>
        )}
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Personal Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>{formData.age} years</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>{formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Weight:</Text>
              <Text style={styles.infoValue}>{formData.weight} kg</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Height:</Text>
              <Text style={styles.infoValue}>
                {formData.height ? `${formData.height} cm` : 
                  `${formData.heightFeet || '0'}ft ${formData.heightInches || '0'}in`}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Diet Preference:</Text>
              <Text style={styles.infoValue}>
                {formData.dietaryPreference.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Fitness Goal:</Text>
              <Text style={styles.infoValue}>
                {formData.fitnessGoal.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Text>
            </View>
          </View>
        </View>

        {dietPlan.days.map((dietDay) => (
          <View key={dietDay.day} style={styles.dayBlock}>
            <Text style={styles.dayHeader}>Day {dietDay.day} Diet Plan</Text>
            <View>
              <Text style={styles.mealLabel}>Breakfast:</Text>
              <Text style={styles.mealText}>{dietDay.breakfast}</Text>
              
              {dietDay.midMorningSnack && (
                <>
                  <Text style={styles.mealLabel}>Mid-Morning Snack:</Text>
                  <Text style={styles.mealText}>{dietDay.midMorningSnack}</Text>
                </>
              )}
              
              <Text style={styles.mealLabel}>Lunch:</Text>
              <Text style={styles.mealText}>{dietDay.lunch}</Text>
              
              {dietDay.eveningSnack && (
                <>
                  <Text style={styles.mealLabel}>Evening Snack:</Text>
                  <Text style={styles.mealText}>{dietDay.eveningSnack}</Text>
                </>
              )}
              
              <Text style={styles.mealLabel}>Dinner:</Text>
              <Text style={styles.mealText}>{dietDay.dinner}</Text>
              
              {dietDay.snacks && !dietDay.midMorningSnack && !dietDay.eveningSnack && (
                <>
                  <Text style={styles.mealLabel}>Snacks:</Text>
                  <Text style={styles.mealText}>{dietDay.snacks}</Text>
                </>
              )}
              
              {dietDay.calories && (
                <Text style={styles.footnote}>
                  Approx. Calories: {dietDay.calories} kcal • Water: {dietDay.water} L
                </Text>
              )}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default WellnessPDF;
