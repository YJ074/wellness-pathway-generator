
import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { pdf } from '@react-pdf/renderer';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import React from 'react';

/**
 * Generates a PDF document for the wellness plan
 * This is a shared function used by all sharing methods
 */
export const generateWellnessPDF = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Starting PDF generation with:', { 
        name: formData.name,
        dietDays: dietPlan.days.length, 
        workoutDays: workoutPlan ? workoutPlan.days.length : 0 
      });
      
      console.log('Diet plan structure:', {
        hasBMI: !!dietPlan.bmi,
        hasBMR: !!dietPlan.bmr,
        hasCalories: !!dietPlan.dailyCalories,
        firstDay: dietPlan.days[0] ? 
          {
            breakfast: !!dietPlan.days[0].breakfast,
            lunch: !!dietPlan.days[0].lunch,
            dinner: !!dietPlan.days[0].dinner
          } : 'No days'
      });
      
      // We need to cast the component to any to bypass the type checking
      // since WellnessPDF returns a Document component but TypeScript can't infer this properly
      const pdfDocument = React.createElement(WellnessPDF, {
        formData: formData,
        dietPlan: dietPlan,
        workoutPlan: workoutPlan
      }) as any; // Cast to any to bypass the TypeScript error
      
      console.log('PDF document created, generating blob...');
      
      // Generate PDF blob - this is asynchronous
      pdf(pdfDocument)
        .toBlob()
        .then((blob) => {
          console.log('PDF generated successfully, size:', Math.round(blob.size / 1024), 'KB');
          resolve(blob);
        })
        .catch(error => {
          console.error("Error in PDF generation:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error in generateWellnessPDF:", error);
      reject(error);
    }
  });
};
