
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import WellnessPDFContainer from './WellnessPDFContainer';

// Register fonts that are built into PDF renderer
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
    { src: 'Helvetica-Oblique', fontStyle: 'italic' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => (
  <Document>
    {/* We'll create multiple pages to split the 75-day plan */}
    <Page size="A4" style={styles.page}>
      <WellnessPDFContainer 
        formData={formData} 
        dietPlan={dietPlan} 
        workoutPlan={workoutPlan} 
        dayRange={[1, 5]} 
      />
    </Page>
    
    {/* Each subsequent page will have up to 5 days */}
    {Array.from({ length: 14 }, (_, i) => (
      <Page key={`page-${i+1}`} size="A4" style={styles.page}>
        <WellnessPDFContainer 
          formData={formData} 
          dietPlan={dietPlan} 
          workoutPlan={workoutPlan}
          daysOnly={true}
          dayRange={[(i+1)*5+1, (i+2)*5]}
        />
      </Page>
    ))}
  </Document>
);

export default WellnessPDF;
