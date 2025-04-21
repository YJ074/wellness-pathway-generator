
import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';
import PDFHeaderSection from './PDFHeaderSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFDayBlock from './PDFDayBlock';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const WellnessPDF = ({ formData, dietPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeaderSection name={formData.name} />

      {dietPlan.bmi && dietPlan.bmr && dietPlan.dailyCalories && (
        <PDFMetricsSection
          bmi={dietPlan.bmi}
          bmiCategory={dietPlan.bmiCategory || ''}
          bmr={dietPlan.bmr}
          dailyCalories={dietPlan.dailyCalories}
        />
      )}

      <PDFPersonalInfoSection formData={formData} />

      {dietPlan.days.map((dietDay) => (
        <PDFDayBlock key={dietDay.day} {...dietDay} />
      ))}
    </Page>
  </Document>
);

export default WellnessPDF;
