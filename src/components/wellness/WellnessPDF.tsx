
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import WellnessPDFContainer from './WellnessPDFContainer';

// Register only standard PDF fonts that are guaranteed to work
// Only using Helvetica and Helvetica-Bold which are built into PDF format
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { 
      src: 'Helvetica-Bold',
      fontWeight: 'bold'
    }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => {
  // Create a paginated approach with up to 2 days per page
  const totalDays = dietPlan.days.length;
  const daysPerPage = 2; // Reduced from 3 to 2 days per page for better spacing
  
  return (
    <Document>
      {/* First page with header information */}
      <Page size="A4" style={styles.page}>
        <WellnessPDFContainer 
          formData={formData} 
          dietPlan={dietPlan} 
          workoutPlan={workoutPlan} 
          dayRange={[1, daysPerPage]} 
        />
      </Page>
      
      {/* Create additional pages with 2 days per page */}
      {Array.from({ length: Math.ceil((totalDays - daysPerPage) / daysPerPage) }, (_, i) => {
        const startDay = (i+1)*daysPerPage+1;
        const endDay = Math.min(startDay + daysPerPage - 1, totalDays);
        
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
