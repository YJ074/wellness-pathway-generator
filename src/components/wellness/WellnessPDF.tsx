
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
  // Create a paginated approach with up to 3 days per page (reduced from 5)
  const totalDays = dietPlan.days.length;
  const totalPages = Math.ceil(totalDays / 3);
  
  return (
    <Document>
      {/* First page with header information */}
      <Page size="A4" style={styles.page}>
        <WellnessPDFContainer 
          formData={formData} 
          dietPlan={dietPlan} 
          workoutPlan={workoutPlan} 
          dayRange={[1, 3]} 
        />
      </Page>
      
      {/* Create additional pages with 3 days per page */}
      {Array.from({ length: Math.ceil((totalDays - 3) / 3) }, (_, i) => {
        const startDay = (i+1)*3+1;
        const endDay = Math.min(startDay + 2, totalDays);
        
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
