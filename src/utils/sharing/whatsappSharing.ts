
import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';

/**
 * Shares the wellness plan via WhatsApp
 */
export const sendPlanViaWhatsApp = async (formData: FormData, dietPlan: DietPlan, workoutPlan?: WorkoutPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Clean the phone number by removing any spaces and ensuring it starts with +91
      const phoneNumber = formData.mobileNumber.replace(/\s+/g, '');
      if (!phoneNumber.startsWith('+91')) {
        throw new Error("Phone number must start with +91");
      }
      
      // Prepare a simplified message with the wellness plan summary to avoid link issues
      const message = `Arogyam75 Wellness Plan for ${formData.name}: ${formData.dietaryPreference.replace(/-/g, ' ')} diet, ${formData.fitnessGoal.replace(/-/g, ' ')} goal. First day includes ${dietPlan.days[0].breakfast.substring(0, 20)}... for breakfast.`;
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp deep link - use the correct format for WhatsApp
      // For Indian numbers, remove the + and use the country code directly
      const whatsappNumber = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      console.log("Opening WhatsApp URL:", whatsappUrl);
      
      // Open WhatsApp in a new tab
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // Check if window opened successfully
      if (newWindow) {
        newWindow.focus();
        resolve();
      } else {
        throw new Error("Popup blocked or unable to open new window");
      }
    } catch (error) {
      console.error("Error in sendPlanViaWhatsApp:", error);
      reject(error);
    }
  });
};
