
import { DietPlan, FormData } from '@/components/wellness/types';
import { PDFViewer, pdf, Document } from '@react-pdf/renderer';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import React from 'react';

/**
 * Sends the wellness plan via email
 */
export const sendPlanViaEmail = async (formData: FormData, dietPlan: DietPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Use the already wrapped Document component from WellnessPDF
      // WellnessPDF already wraps its content in a Document component
      const pdfDocument = React.createElement(WellnessPDF, { formData, dietPlan });
      
      // Generate PDF blob - this is asynchronous
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
      
      // Prepare a detailed message with the wellness plan summary
      const message = `🌟 *Arogyam75 Wellness Plan* 🌟\n\n` +
        `Hello ${formData.name},\n\n` +
        `Your personalized 75-day wellness journey awaits! Here's a summary:\n\n` +
        `🥗 *Diet Type:* ${formData.dietaryPreference.replace(/-/g, ' ')}\n` +
        `🏋️ *Fitness Goal:* ${formData.fitnessGoal.replace(/-/g, ' ')}\n` +
        `💧 *Daily Water Target:* ${(parseFloat(formData.weight) * 0.033).toFixed(1)}L\n\n` +
        `Your first day plan includes:\n` +
        `🍳 *Breakfast:* ${dietPlan.days[0].breakfast.substring(0, 40)}...\n` +
        `🥗 *Lunch:* ${dietPlan.days[0].lunch.substring(0, 40)}...\n` +
        `🍽️ *Dinner:* ${dietPlan.days[0].dinner.substring(0, 40)}...\n\n` +
        `For the complete 75-day plan, check your email or login to the Arogyam75 portal.`;
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp deep link - use the correct format for WhatsApp
      // For Indian numbers, remove the + and use the country code directly
      const whatsappNumber = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Resolve after a short delay
      setTimeout(resolve, 1000);
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
  methods: { email: boolean, whatsapp: boolean }
): Promise<{ success: boolean, error?: string }> => {
  try {
    const promises = [];
    
    if (methods.email && formData.email) {
      promises.push(sendPlanViaEmail(formData, dietPlan));
    }
    
    if (methods.whatsapp && formData.mobileNumber) {
      promises.push(sendPlanViaWhatsApp(formData, dietPlan));
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
}
