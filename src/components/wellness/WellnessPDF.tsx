
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

const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => {
  // Safely limit the number of days to prevent rendering issues
  // Create a paginated approach with up to 5 days per page
  return (
    <Document>
      {/* First page with header information */}
      <Page size="A4" style={styles.page}>
        <WellnessPDFContainer 
          formData={formData} 
          dietPlan={dietPlan} 
          workoutPlan={workoutPlan} 
          dayRange={[1, 5]} 
        />
      </Page>
      
      {/* Create additional pages with 5 days per page */}
      {Array.from({ length: 14 }, (_, i) => {
        const startDay = (i+1)*5+1;
        const endDay = Math.min((i+2)*5, 75);
        
        return (
          <Page key={`page-${i+1}`} size="A4" style={styles.page}>
            <WellnessPDFContainer 
              formData={formData} 
              dietPlan={dietPlan} 
              workoutPlan={workoutPlan}
              daysOnly={true}
              dayRange={[startDay, endDay]}
            />
          </Page>
        );
      })}
    </Document>
  );
};

export default WellnessPDF;
