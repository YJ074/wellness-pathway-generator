import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { pdf } from '@react-pdf/renderer';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import React from 'react';

/**
 * Sends the wellness plan via email
 */
export const sendPlanViaEmail = async (formData: FormData, dietPlan: DietPlan, workoutPlan?: WorkoutPlan): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create the document element with WellnessPDF
      const pdfDocument = React.createElement(WellnessPDF, { formData, dietPlan, workoutPlan });
      
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

/**
 * Sends wellness plan data to a Make.com webhook
 */
export const sendToMakeWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan,
  webhookUrl: string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!webhookUrl) {
        throw new Error("Make.com webhook URL is required");
      }

      // Create the document element with WellnessPDF
      const pdfDocument = React.createElement(WellnessPDF, { formData, dietPlan, workoutPlan });
      
      // Generate PDF blob
      // @ts-ignore - Ignoring type issues with PDF generation
      const pdfBlob = await pdf(pdfDocument).toBlob();
      
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
      promises.push(sendToMakeWebhook(formData, dietPlan, workoutPlan, methods.make));
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
