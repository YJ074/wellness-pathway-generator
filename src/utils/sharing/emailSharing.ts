
import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { generateWellnessPDF } from '../pdf/generatePDF';

/**
 * Sends the wellness plan via email
 */
export const sendPlanViaEmail = async (formData: FormData, dietPlan: DietPlan, workoutPlan?: WorkoutPlan): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate the PDF using the shared function
      const pdfBlob = await generateWellnessPDF(formData, dietPlan, workoutPlan);
      
      console.log(`Sending wellness plan to ${formData.email}`);
      console.log(`Plan for ${formData.name}, age: ${formData.age}, goal: ${formData.fitnessGoal}`);
      
      // For now, simulate API call
      setTimeout(() => {
        resolve();
      }, 1500);
    } catch (error) {
      console.error("Error in sendPlanViaEmail:", error);
      reject(error);
    }
  });
};
