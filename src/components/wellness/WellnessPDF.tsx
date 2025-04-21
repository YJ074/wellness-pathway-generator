
import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { DietPlan, FormData } from './types';
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
}

const WellnessPDF = ({ formData, dietPlan }: WellnessPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <WellnessPDFContainer formData={formData} dietPlan={dietPlan} />
    </Page>
  </Document>
);

export default WellnessPDF;

