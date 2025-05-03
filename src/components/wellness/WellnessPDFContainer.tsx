
import React from 'react';
import { View } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import PDFHeaderSection from './PDFHeaderSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFDietDaysSection from './PDFDietDaysSection';

interface WellnessPDFContainerProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const WellnessPDFContainer = ({ formData, dietPlan, workoutPlan }: WellnessPDFContainerProps) => {
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
      
      {/* Use the new PDFDietDaysSection component */}
      <PDFDietDaysSection 
        dietPlan={dietPlan} 
        formData={formData} 
        workoutPlan={workoutPlan} 
      />
    </View>
  );
};

export default WellnessPDFContainer;
