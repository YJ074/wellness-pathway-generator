
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
      
      // Create PDF using the WellnessPDF component
      const pdfDocument = React.createElement(WellnessPDF, {
        formData,
        dietPlan,
        workoutPlan
      });
      
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
