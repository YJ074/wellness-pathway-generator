import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { generateWellnessPDF } from '../pdf/generatePDF';

/**
 * Sends wellness plan data to a Make.com webhook
 */
export const sendToMakeWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  webhookUrl: string,
  workoutPlan?: WorkoutPlan
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!webhookUrl) {
        throw new Error("Make.com webhook URL is required");
      }

      // Generate the PDF using the shared function
      const pdfBlob = await generateWellnessPDF(formData, dietPlan, workoutPlan);
      
      // Convert blob to base64 for sending in JSON
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      
      reader.onloadend = async () => {
        // Get base64 data (remove the data:application/pdf;base64, prefix)
        const base64data = reader.result?.toString().split(',')[1];
        
        if (!base64data) {
          throw new Error("Failed to convert PDF to base64");
        }
        
        // Prepare the payload for Make.com
        const payload = {
          userData: {
            name: formData.name,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            age: formData.age,
            gender: formData.gender,
            dietaryPreference: formData.dietaryPreference,
            fitnessGoal: formData.fitnessGoal,
            wellnessGoals: formData.wellnessGoals
          },
          // Include basic plan metadata but not full data to keep payload size manageable
          planMeta: {
            hasDietPlan: true,
            hasWorkoutPlan: !!workoutPlan,
            dietDays: dietPlan.days.length,
            workoutDays: workoutPlan ? workoutPlan.days.length : 0,
            bmi: dietPlan.bmi,
            bmr: dietPlan.bmr,
            dailyCalories: dietPlan.dailyCalories
          },
          // Send the PDF as base64
          pdfBase64: base64data,
          timestamp: new Date().toISOString()
        };
        
        console.log("Sending data to Make.com webhook:", webhookUrl);
        
        // Make API call to webhook
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          throw new Error(`Webhook error: ${response.status}`);
        }
        
        console.log("Successfully sent data to Make.com webhook");
        resolve();
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading PDF file"));
      };
      
    } catch (error) {
      console.error("Error in sendToMakeWebhook:", error);
      reject(error);
    }
  });
};
