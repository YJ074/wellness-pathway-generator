
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import PDFHeaderSection from './PDFHeaderSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFDietDaysSection from './PDFDietDaysSection';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  pageInfo: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15, // Increased from 10
    marginTop: 10, // Added top margin
    fontFamily: 'Helvetica',
  },
  sectionSpacing: {
    marginBottom: 15, // Added spacing between sections
  }
});

interface WellnessPDFContainerProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
  dayRange?: [number, number]; // Optional range of days to display
  daysOnly?: boolean; // If true, only show days without header sections
}

const WellnessPDFContainer = ({ 
  formData, 
  dietPlan, 
  workoutPlan,
  dayRange = [1, 75],
  daysOnly = false
}: WellnessPDFContainerProps) => {
  // Filter days based on the range
  const filteredDays = {
    ...dietPlan,
    days: dietPlan.days.filter(day => day.day >= dayRange[0] && day.day <= dayRange[1])
  };
  
  return (
    <View style={styles.container}>
      {/* Only show header sections on the first page */}
      {!daysOnly && (
        <>
          <View style={styles.sectionSpacing}>
            <PDFHeaderSection name={formData.name} />
          </View>
          
          {dietPlan.bmi && dietPlan.bmr && dietPlan.dailyCalories && (
            <View style={styles.sectionSpacing}>
              <PDFMetricsSection
                bmi={dietPlan.bmi}
                bmiCategory={dietPlan.bmiCategory || ''}
                bmr={dietPlan.bmr}
                dailyCalories={dietPlan.dailyCalories}
                hasMuscularBuild={!!formData.has_muscular_build}
              />
            </View>
          )}
          
          <View style={styles.sectionSpacing}>
            <PDFPersonalInfoSection formData={formData} />
          </View>
        </>
      )}
      
      {/* Page indicator */}
      <Text style={styles.pageInfo}>
        Days {dayRange[0]} - {Math.min(dayRange[1], 75)}
      </Text>
      
      {/* Use the PDFDietDaysSection component with filtered days */}
      <PDFDietDaysSection 
        dietPlan={filteredDays} 
        formData={formData} 
        workoutPlan={workoutPlan} 
      />
    </View>
  );
};

export default WellnessPDFContainer;
