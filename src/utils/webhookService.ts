/**
 * Webhook service for sending data to external services like Make.com
 * This file handles webhook communication without exposing it in the UI
 */

import { DietPlan, FormData, WorkoutPlan } from '@/components/wellness/types';
import { pdf, Document } from '@react-pdf/renderer';
import React from 'react';
import WellnessPDF from '@/components/wellness/WellnessPDF';
import { toast } from '@/hooks/use-toast';

// Default Make.com webhook URL - replace with your actual Make.com webhook URL in your environment
let MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID';

/**
 * Sets the Make.com webhook URL
 * @param url The Make.com webhook URL
 */
export const setMakeWebhookUrl = (url: string): void => {
  if (url && url.trim() !== '') {
    MAKE_WEBHOOK_URL = url;
    // Store in localStorage for persistence
    localStorage.setItem('makeWebhookUrl', url);
    console.log('Make.com webhook URL set:', url);
  }
};

/**
 * Gets the current Make.com webhook URL
 * @returns The current Make.com webhook URL
 */
export const getMakeWebhookUrl = (): string => {
  // Try to get from localStorage first
  const storedUrl = localStorage.getItem('makeWebhookUrl');
  if (storedUrl) {
    MAKE_WEBHOOK_URL = storedUrl;
  }
  return MAKE_WEBHOOK_URL;
};

/**
 * Sends wellness plan data to a Make.com webhook endpoint
 * @param formData User form data
 * @param dietPlan Generated diet plan
 * @param workoutPlan Optional workout plan
 */
export const sendPlanToMakeWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan
): Promise<boolean> => {
  try {
    console.log("Preparing to send wellness plan data to Make.com webhook");
    
    // Get the current webhook URL
    const webhookUrl = getMakeWebhookUrl();
    
    // Check if webhook URL is set
    if (webhookUrl === 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID') {
      console.warn("Make.com webhook URL is not set. Please configure it first.");
      toast({
        title: "Webhook Not Configured",
        description: "Make.com webhook URL is not set. Your data will not be sent to Make.com.",
        variant: "destructive",
      });
      return false;
    }
    
    // Prepare webhook payload with wellness plan data
    const webhookData = {
      userInfo: {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        weight: formData.weight,
        height: formData.height || `${formData.heightFeet}'${formData.heightInches}"`,
        mobileNumber: formData.mobileNumber,
        fitnessGoal: formData.fitnessGoal,
        dietaryPreference: formData.dietaryPreference,
        wellnessGoals: formData.wellnessGoals,
        timestamp: new Date().toISOString()
      },
      contactInfo: {
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        name: formData.name
      },
      dietPlan: {
        metrics: {
          bmi: dietPlan.bmi,
          bmiCategory: dietPlan.bmiCategory,
          bmr: dietPlan.bmr,
          dailyCalories: dietPlan.dailyCalories
        },
        days: dietPlan.days.map(day => ({
          ...day,
          // Format wellness benefits for better presentation
          wellnessInfo: {
            hairNutrients: day.hairNutrients,
            skinNutrients: day.skinNutrients,
            fatLossNotes: day.fatLossNotes,
            pcosFriendlyNotes: day.pcosFriendlyNotes,
            herbalRecommendations: day.herbalRecommendations
          }
        }))
      },
      workoutPlan: workoutPlan ? {
        days: workoutPlan.days
      } : null,
      // Adding metadata for Make.com processing
      metadata: {
        source: 'arogyam75',
        version: '1.0',
        includesWorkout: !!workoutPlan
      }
    };
    
    console.log("Sending wellness plan data to Make.com webhook");
    
    // Send the webhook payload to Make.com
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });
    
    if (!response.ok) {
      console.error("Make.com webhook API error:", await response.text());
      toast({
        title: "Webhook Error",
        description: "Could not send your data to Make.com. Please check your webhook URL.",
        variant: "destructive",
      });
      return false;
    }
    
    console.log("Wellness plan sent successfully to Make.com");
    toast({
      title: "Success",
      description: "Your wellness plan has been sent to Make.com successfully.",
    });
    return true;
  } catch (error) {
    console.error("Error sending webhook to Make.com:", error);
    toast({
      title: "Error",
      description: "An unexpected error occurred when sending to Make.com.",
      variant: "destructive",
    });
    return false;
  }
};

/**
 * Sends PDF data to a webhook endpoint
 * @param formData User form data
 * @param dietPlan Generated diet plan
 * @param workoutPlan Optional workout plan
 */
export const sendPDFToWebhook = async (
  formData: FormData, 
  dietPlan: DietPlan, 
  workoutPlan?: WorkoutPlan
): Promise<boolean> => {
  try {
    console.log("Preparing to send PDF data to webhook");
    
    // Create the PDF document properly typed as Document element
    // The type casting is necessary to resolve the TypeScript error
    const pdfDocument = React.createElement(WellnessPDF as unknown as React.FC<Record<string, unknown>>, { 
      formData, 
      dietPlan, 
      workoutPlan 
    });
    
    // Generate PDF as base64 data
    const pdfBlob = await pdf(pdfDocument).toBlob();
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64data = reader.result?.toString().split(',')[1];
          
          // Prepare webhook payload with PDF data and user information
          const webhookData = {
            userInfo: {
              name: formData.name,
              email: formData.email,
              age: formData.age,
              gender: formData.gender,
              fitnessGoal: formData.fitnessGoal,
              dietaryPreference: formData.dietaryPreference,
              timestamp: new Date().toISOString()
            },
            contactData: {
              email: formData.email,
              mobileNumber: formData.mobileNumber,
              name: formData.name
            },
            pdfData: base64data,
            // Adding metadata for Make.com processing
            metadata: {
              contentType: 'application/pdf',
              filename: `${formData.name.replace(/\s+/g, '-').toLowerCase()}-wellness-plan.pdf`,
              source: 'arogyam75'
            }
          };
          
          console.log("Sending webhook with PDF data");
          
          // Send the webhook payload
          const response = await fetch(MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData),
          });
          
          if (!response.ok) {
            console.error("Webhook API error:", await response.text());
            resolve(false);
            return;
          }
          
          console.log("Webhook sent successfully");
          resolve(true);
        } catch (error) {
          console.error("Error sending webhook:", error);
          resolve(false);
        }
      };
      
      reader.onerror = () => {
        console.error("Error reading PDF blob");
        resolve(false);
      };
      
      // Read the blob as Data URL to get base64 data
      reader.readAsDataURL(pdfBlob);
    });
  } catch (error) {
    console.error("Error in webhook preparation:", error);
    return false;
  }
};
