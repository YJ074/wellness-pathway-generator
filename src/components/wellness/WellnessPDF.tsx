
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import WellnessPDFContainer from './WellnessPDFContainer';
import { applyTriplePassDeduplication } from '@/utils/diet/helpers/deduplication';

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
  
  // Apply enhanced deduplication to each day before generating the PDF
  const processedDietPlan = {
    ...dietPlan,
    days: dietPlan.days.map(day => {
      // Pre-process all meal descriptions to ensure no duplication in the PDF
      return {
        ...day,
        // Apply triple-pass deduplication to each meal
        breakfast: applyTriplePassDeduplication(day.breakfast),
        lunch: applyTriplePassDeduplication(day.lunch),
        dinner: applyTriplePassDeduplication(day.dinner),
        midMorningSnack: day.midMorningSnack ? applyTriplePassDeduplication(day.midMorningSnack) : undefined,
        eveningSnack: day.eveningSnack ? applyTriplePassDeduplication(day.eveningSnack) : undefined
      };
    })
  };
  
  return (
    <Document>
      {/* First page with header information */}
      <Page size="A4" style={styles.page}>
        <WellnessPDFContainer 
          formData={formData} 
          dietPlan={processedDietPlan} 
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
              dietPlan={processedDietPlan} 
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
