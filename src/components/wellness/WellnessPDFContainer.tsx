
import React from 'react';
import { View } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';
import PDFHeaderSection from './PDFHeaderSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFDietDaysSection from './PDFDietDaysSection';

interface WellnessPDFContainerProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const WellnessPDFContainer = ({ formData, dietPlan }: WellnessPDFContainerProps) => (
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
    <PDFDietDaysSection days={dietPlan.days} />
  </View>
);

export default WellnessPDFContainer;
