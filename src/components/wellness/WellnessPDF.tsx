
import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import WellnessPDFContainer from './WellnessPDFContainer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <WellnessPDFContainer formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
    </Page>
  </Document>
);

export default WellnessPDF;
