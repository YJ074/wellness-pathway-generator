
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { DietPlan, FormData, WorkoutPlan } from './types';
import WellnessPDFContainer from './WellnessPDFContainer';

// Register standard fonts that are highly compatible with PDF rendering
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
    // Add italic version for Roboto
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontWeight: 400, fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    lineHeight: 1.4,
  },
});

interface WellnessPDFProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

// This component must return a Document component from react-pdf/renderer
// The pdf() function expects a Document component directly
const WellnessPDF = ({ formData, dietPlan, workoutPlan }: WellnessPDFProps) => {
  // Console log to debug PDF creation
  console.log('Creating WellnessPDF with:', { 
    name: formData.name,
    dietDays: dietPlan.days.length,
    workoutDays: workoutPlan ? workoutPlan.days.length : 0
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <WellnessPDFContainer formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      </Page>
    </Document>
  );
};

export default WellnessPDF;
