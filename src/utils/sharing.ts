
import { DietPlan, FormData } from '@/components/wellness/types';
import { pdf } from '@react-pdf/renderer';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import React from 'react';
import { sendPDFToWebhook } from './webhookService';

/**
 * Sends the wellness plan via email
 */
export const sendPlanViaEmail = async (formData: FormData, dietPlan: DietPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create the document element with WellnessPDF
      const pdfDocument = React.createElement(WellnessPDF, { formData, dietPlan });
      
      // Generate PDF blob - this is asynchronous
      // @ts-ignore - Ignoring type issues with PDF generation
      pdf(pdfDocument).toBlob().then((blob) => {
        // In a real implementation with Supabase:
        // 1. Upload the blob to Supabase Storage
        // 2. Get the URL
        // 3. Send email with the URL through Supabase Edge Function
        
        console.log(`Sending wellness plan to ${formData.email}`);
        console.log(`Plan for ${formData.name}, age: ${formData.age}, goal: ${formData.fitnessGoal}`);
        
        // For now, simulate API call
        setTimeout(() => {
          resolve();
        }, 1500);
      }).catch(error => {
        console.error("Error generating PDF:", error);
        reject(error);
      });
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

/**
 * Sends the wellness plan via both WhatsApp and email
 */
export const shareWellnessPlan = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  methods: { email: boolean, whatsapp: boolean, make?: string }
): Promise<{ success: boolean, error?: string }> => {
  try {
    const promises = [];
    
    if (methods.email && formData.email) {
      promises.push(sendPlanViaEmail(formData, dietPlan));
    }
    
    if (methods.whatsapp && formData.mobileNumber) {
      promises.push(sendPlanViaWhatsApp(formData, dietPlan));
    }
    
    // Always send to webhook in the background - no UI visibility required
    // This happens regardless of the sharing methods selected by the user
    sendPDFToWebhook(formData, dietPlan)
      .then(success => {
        if (success) {
          console.log("PDF data sent to Make.com webhook successfully");
        } else {
          console.error("Failed to send PDF data to Make.com webhook");
        }
      })
      .catch(error => {
        console.error("Error sending to webhook:", error);
      });
    
    if (promises.length === 0 && !methods.make) {
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
}
