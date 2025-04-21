
import { DietPlan, FormData } from '@/components/wellness/types';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import { createElement } from 'react';

/**
 * Sends the wellness plan via email
 */
export const sendPlanViaEmail = async (formData: FormData, dietPlan: DietPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // In an actual implementation, this would send the PDF to a backend service
      // that would handle email delivery
      console.log("Sending email to:", formData.email);
      
      // For demonstration, we'll simulate an API call
      setTimeout(() => {
        // Success case - in a real implementation, this would be after API confirmation
        resolve();
      }, 1500);
      
      // To implement actual email sending, you would:
      // 1. Generate the PDF blob
      // 2. Send it to a backend service via API call
      // 3. The backend would attach the PDF and send the email
    } catch (error) {
      console.error("Error in sendPlanViaEmail:", error);
      reject(error);
    }
  });
};

/**
 * Shares the wellness plan via WhatsApp
 */
export const sendPlanViaWhatsApp = async (formData: FormData, dietPlan: DietPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // For a simple implementation, we'll open WhatsApp with a pre-filled message
      const phoneNumber = formData.mobileNumber.replace(/\s+/g, '');
      
      // Create a summary message for WhatsApp
      const message = `Hello ${formData.name}, here's your 75-day wellness plan from Arogyam75! View your complete diet plan.`;
      
      // Encode the message for a URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp deep link
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Resolve after a short delay to simulate completion
      setTimeout(resolve, 1000);
      
      // Note: For a complete implementation with the actual PDF:
      // 1. You would need a backend service that generates the PDF
      // 2. Uploads it to a storage service that provides a public URL
      // 3. Includes that URL in the WhatsApp message
    } catch (error) {
      console.error("Error in sendPlanViaWhatsApp:", error);
      reject(error);
    }
  });
};
