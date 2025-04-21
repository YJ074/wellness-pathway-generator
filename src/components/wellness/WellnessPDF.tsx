
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';
import PDFPersonalInfoSection from './PDFPersonalInfoSection';
import PDFMetricsSection from './PDFMetricsSection';
import PDFDayBlock from './PDFDayBlock';

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
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const WellnessPDF = ({ formData, dietPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/lovable-uploads/55244ed4-16fb-43f1-bcc6-6ba6169d042e.png" style={styles.logo} />
      <Text style={styles.title}>Personalized 75-Day Wellness Plan</Text>
      <Text style={styles.subtitle}>Created for {formData.name}</Text>

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
