
import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { sendPlanViaEmail } from './emailSharing';
import { sendPlanViaWhatsApp } from './whatsappSharing';
import { sendToMakeWebhook } from './webhookSharing';
import { generateWellnessPDF } from '../pdf/generatePDF';

// Re-export the individual sharing methods for direct use
export { sendPlanViaEmail, sendPlanViaWhatsApp, sendToMakeWebhook, generateWellnessPDF };

/**
 * Sends the wellness plan via both WhatsApp and email
 */
export const shareWellnessPlan = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  methods: { email: boolean, whatsapp: boolean, make?: string },
  workoutPlan?: WorkoutPlan
): Promise<{ success: boolean, error?: string }> => {
  try {
    const promises = [];
    
    if (methods.email && formData.email) {
      promises.push(sendPlanViaEmail(formData, dietPlan, workoutPlan));
    }
    
    if (methods.whatsapp && formData.mobileNumber) {
      promises.push(sendPlanViaWhatsApp(formData, dietPlan, workoutPlan));
    }
    
    if (methods.make && methods.make.trim() !== '') {
      promises.push(sendToMakeWebhook(formData, dietPlan, methods.make, workoutPlan));
    }
    
    if (promises.length === 0) {
      return { 
        success: false, 
        error: "No sharing method selected or contact information missing" 
      };
    }
    
    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error("Error sharing wellness plan:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to share wellness plan" 
    };
  }
};
